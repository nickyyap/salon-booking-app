import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import { useEffect } from "react";
import IconButton from "../components/IconButton";

export default function Layout({ children }) {
    const [authToken, setAuthToken] = useLocalStorage("authToken", "");
    const navigate = useNavigate();

    useEffect(() => {
        if (!authToken) {
            navigate("/login");
        }
    }, [authToken, navigate]);

    const handleLogout = () => {
        setAuthToken("");
    };

    return (
        <Container fluid>
            <Row>
                <Col 
                    sm={2} 
                    className="d-flex-column justify-content-start align-items-start bg-light vh-100"
                    style={{ position: "sticky", top: 0 }}
                >
                    <h5 className="mt-4">Booking App</h5>
                    <IconButton className="bi bi-house" text="Home" path="/home" />
                    <IconButton className="bi bi-bookmark" text="My Appointment" path="/appointment" />
                    <IconButton className="bi bi-box-arrow-left" text="Logout" onClick={handleLogout} />
                </Col>

                <Col sm={10} className="p-4">
                    {children}
                </Col>
            </Row>
        </Container>
    );
}
