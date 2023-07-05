import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

function ListCard({ title, description, date, _id }) {
  return (
    
   
    <Card border="secondary" style={{width:"18rem"}}>
      <Card.Body>
      <Card.Title>{title}</Card.Title>
      <h4>{date.toString().split("T")[0]}</h4>
      <Card.Text>{description}</Card.Text>
      <Link to={`/lists/${_id}`}>
        <Button variant="secondary">Details</Button>
      </Link>
      </Card.Body>
    </Card>
  
  );
}

export default ListCard;
