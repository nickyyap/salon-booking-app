import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import BookStylist from "../components/BookStylist";
import stylist1 from "../assets/images/1.png";
import stylist2 from "../assets/images/2.png";
import stylist3 from "../assets/images/3.png";
import stylist4 from "../assets/images/4.png";
import stylist5 from "../assets/images/5.png";
import stylist6 from "../assets/images/6.png";

const stylist = [
    { id: 1, name: 'Carrie Au', title: "Nail Stylist", image: stylist1 },
    { id: 2, name: 'Mike Johnson', title: "Beard Specialist", image: stylist2 },
    { id: 3, name: 'Adam Kylian', title: "Color Expert", image: stylist3 },
    { id: 4, name: 'Anna Taylor', title: "Makup Artist", image: stylist4 },
    { id: 5, name: 'Georgina Smith', title: "Hair Stylist", image: stylist5 },
    { id: 6, name: 'Mia Dohnson', title: "Haircut Senior", image: stylist6 },
];

export default function Home() {
    const navigate = useNavigate();

    function handleBookStylist(stylist) {
        navigate("/booking", { state: { stylist } });
    }

    return (
        <>
            <Layout>
                <Container>
                    <Row>
                        <Col>
                            <h1 className="d-flex justify-content-center fw-bold p-4">Book Us Now!</h1>
                            <Row className="g-5">
                                {stylist.map((stylist) => (
                                    <Col 
                                    key={stylist.id} md={4}>
                                        <BookStylist stylist={stylist} onBook={handleBookStylist} />
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Layout>
        </>
    );
}
