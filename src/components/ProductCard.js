import { Card, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";

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
}) {
  const location = useLocation();

  return (
    <div className="ProductCard" key={_id}>
      <Card border="secondary" style={{ width: "18rem" }}>
        <img className="imageProduct" src={imageURL} alt="product-alt" />
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
        </Card.Body>

        {quantity > 0 ? (
          location.pathname === `/lists/${list}` && (
            <Button onClick={(e) => handleBuy(_id, quantity)}>Buy Now</Button>
          )
        ) : (
          <h3>Not Available</h3>
        )}
      </Card>
    </div>
  );
}

export default ProductCard;
