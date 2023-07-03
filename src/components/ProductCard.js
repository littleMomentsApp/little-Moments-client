import { Link } from "react-router-dom";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";

function ProductCard({ title, image, description, category, price, _id }) {
  
  const navigate = useNavigate();
  const storedToken = localStorage.getItem("authToken");
 
  const deleteProduct = () => {
    axios
      .delete(`${API_URL}/api/products/${_id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        navigate("/products");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="ProductCard">
      <h3>{title}</h3>
      <img src={image} alt="product-alt" />
      <p>{description}</p>
      <p>{category}</p>
      <h4>Price: {price}$ </h4>
      <Link to={"/lists"}>
        <button>Buy Now</button>
      </Link>
      <button onClick={deleteProduct}>Delete Product</button>
    </div>
  );
}

export default ProductCard;
