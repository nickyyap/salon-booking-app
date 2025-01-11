import { useState, useEffect } from "react";
import { Col, Row, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";
import useLocalStorage from "use-local-storage";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const url = "https://e2236c9c-0918-4d1f-8499-791c1fe6fcfe-00-16q0lr6ljsfbf.pike.replit.dev";
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authToken, setAuthToken] = useLocalStorage("authToken", "");
    const [alertMessage, setAlertMessage] = useState("");
    const [alertVariant, setAlertVariant] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (authToken) {
            navigate("/home");
        }
    }, [authToken, navigate]);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${url}/signup`, { email, password });
            console.log(res.data);
            if (res.data) {
                setAlertVariant("success");
                setAlertMessage("Sign up successful! Please log in.");
                setTimeout(() => {
                    setAlertMessage("");
                }, 5000);
            }
        } catch (error) {
            console.error(error);
            setAlertVariant("danger");
            setAlertMessage("Unable to sign up. Please check the input.");
            setTimeout(() => {
                setAlertMessage("");
            }, 5000);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${url}/login`, { email, password });
            if (res.data && res.data.auth === true && res.data.token) {
                setAuthToken(res.data.token);
                console.log("Login was successful, token save");
            }
        } catch (error) {
            console.error(error);
            setAlertVariant("danger");
            setAlertMessage("Incorrect email or password. Please try again");
            setTimeout(() => {
                setAlertMessage("");
            }, 5000);
        }
    }

    return (
        <Row className="d-flex justify-content-center align-items-center vh-100">
            <Col sm={4} className="text-center">
                <h1 className="mb-4 fw-bold">{isLogin ? "Login" : "Sign Up"}</h1>
                {alertMessage && (
                    <Alert variant={alertVariant} onClose={() => setAlertMessage("")} dismissible>
                        {alertMessage}
                    </Alert>
                )}
                <Button className="rounded-pill mb-2" variant="outline-dark" size="lg" style={{ width: "100%" }} onClick="" >
                    <i className="bi bi-google"></i> Continue with Google
                </Button>
                <p className="p-3">or</p>
                <Form onSubmit={isLogin ? handleLogin : handleSignUp}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                            type="email"
                            placeholder="EMAIL"
                            className="rounded-pill p-2"
                            style={{ width: "100%" }}
                            onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control
                            type="password"
                            placeholder="PASSWORD"
                            className="rounded-pill p-2"
                            style={{ width: "100%" }}
                            onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    {!isLogin && (
                        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                            <Form.Control
                                type="password"
                                placeholder="CONFIRM PASSWORD"
                                className="rounded-pill p-2"
                                style={{ width: "100%" }} />
                        </Form.Group>
                    )}
                    <Button type="submit" className="rounded-pill mt-4" variant="dark" size="lg" style={{ width: "100%" }}>
                        {isLogin ? "Login" : "Sign Up"}
                    </Button>
                </Form>

                <p className="mt-3">{isLogin ? "No account" : "Already have an account?"} <span id="toggle-link" style={{ color: "#007bff", textDecoration: "underline", cursor: "pointer" }} onClick={toggleForm}>{isLogin ? "Sign Up" : "Login"}</span></p>
            </Col>
        </Row>
    );
}
