import { Card, Button } from "react-bootstrap";

export default function BookStylist({ stylist, onBook }) {
    return (
        <Card className="text-center stylist-card">
            <Card.Img
                variant="top"
                src={stylist.image}
                alt={stylist.name} />
            <Card.Body>
                <Card.Title>{stylist.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{stylist.title}</Card.Subtitle>
            </Card.Body>
            <Button className="mb-3" variant="dark" style={{width:"100px", margin: "0 auto"}} onClick={() => onBook(stylist)}>
                Book Now
            </Button>
        </Card>
    );
}
