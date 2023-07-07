import { Card, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

function ProductCard({
  title,
  imageURL,
  description,
  quantity,
  category,
  price,
  _id,
  handleBuy,
  list,
  deleteProduct,
  deleteFromApi,
}) {
  const location = useLocation();
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <Card className="m-4" border="secondary" key={_id}>
      <Card.Img variant="top" className="imageCard" src={imageURL} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>
          {" "}
          <b>Quantity:</b> {quantity}
        </Card.Text>
        <Card.Text>{category}</Card.Text>
        <Card.Text>
          <b>Price:</b> {price}${" "}
        </Card.Text>
        {quantity > 0 ? (
          location.pathname === `/lists/${list}` && (
            <Button
              variant="outline-info"
              onClick={(e) => handleBuy(_id, quantity)}
            >
              Buy Now
            </Button>
          )
        ) : (
          <h3>Not Available</h3>
        )}

        {location.pathname === `/lists/edit/${list}` && (
          <Button
            variant="outline-danger"
            onClick={(e) => {
              console.log("delete element ", _id);
              deleteProduct(_id, e);
            }}
          >
            Remove Product
          </Button>
        )}
        {isLoggedIn && location.pathname === `/products` && (
          <Button
            variant="outline-danger"
            onClick={() => {
              deleteFromApi(_id);
            }}
          >
            Delete Product
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
