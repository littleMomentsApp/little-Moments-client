import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const API_URL = "http://localhost:5005";

function EditListPage(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [products, setProducts] = useState([]);
  const currentDate = new Date().toISOString().split("T")[0];
  const { listId } = useParams();
  const navigate = useNavigate();
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`${API_URL}/api/lists/${listId}`)
      .then((response) => {
        const oneList = response.data;
        setTitle(oneList.title);
        setDescription(oneList.description);
        setDate(oneList.date);
        setProducts(oneList.products);
      })
      .catch((error) => console.log(error));
  }, [listId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = { title, description, date, products };

    axios
      .put(`${API_URL}/api/lists/${listId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        navigate("/lists");
      });
  };
  return (
    <div className="EditListPage">
      <h3>Edit the List</h3>

      <form onSubmit={handleFormSubmit}>
        <label>
          Title:
          <input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label>
          Date:
          <input
            type="date"
            name="date"
            min={currentDate}
            value={date.toString().split("T")[0]}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>

        <label>Products:</label>
        {products &&
          products.map((productObj) => (
            <ProductCard key={productObj._id} {...productObj} />
          ))}
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditListPage;
