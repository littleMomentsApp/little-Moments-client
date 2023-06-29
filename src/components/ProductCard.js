import { Link } from "react-router-dom";

function ProductCard({ title, description, price, _id }) {
  return (
    <div className="ProductCard">
      <h3>{title}</h3>
      <p>{description}</p>
      <h4>{price}</h4>
      <Link to={`/lists/${_id}`}>
        <button>Buy Now</button>
      </Link>
    </div>
  );
}

export default ProductCard;
