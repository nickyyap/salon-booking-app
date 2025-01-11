import { Button, Col} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export default function IconButton({ className, onClick, text, path}) {
    let margin = `light rounded-pill`
    const navigate = useNavigate();

    const iconMargin = text ? " me-3" : " ";

    const handleClick = () => {
        if (path) {
            navigate(path);
        } else if (onClick) {
            onClick();
        }
    }

    return (
        <Col>
        <Button variant={margin} onClick={handleClick}>
            <i
                className={className + iconMargin}
                style={{ fontSize: "24px", color: "black" }}></i>
            {text}
        </Button>
        </Col>
    )
}