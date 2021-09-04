import { Button, Card, Col, ListGroup } from "react-bootstrap"
import { useDispatch } from "react-redux";
import { fetchDetailCharacter } from "../../redux/reducers";
const CharactersListItem = (props) => {
    const dispatch = useDispatch();
    return (
        <Col md={3}>
            <Card>
                <Card.Img variant="top" src={props.image} />
                <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item className="d-flex justify-content-between">
                            <Card.Text>Gender:</Card.Text>
                            <Card.Text>{props.gender}</Card.Text>
                        </ListGroup.Item>
                        <ListGroup.Item className="d-flex justify-content-between">
                            <Card.Text>Species:</Card.Text>
                            <Card.Text>{props.species}</Card.Text>
                        </ListGroup.Item>
                        <ListGroup.Item className="d-flex justify-content-between">
                            <Card.Text>Status:</Card.Text>
                            <Card.Text>{props.status}</Card.Text>
                        </ListGroup.Item>
                        <ListGroup.Item className="d-flex justify-content-between">
                            <Card.Text>Type:</Card.Text>
                            <Card.Text>{props.type}</Card.Text>
                        </ListGroup.Item>
                    </ListGroup>
                    <Button variant="primary" data-id={props.id} onClick={(e) => dispatch(fetchDetailCharacter(e.target.dataset.id))}>Show detail</Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default CharactersListItem;