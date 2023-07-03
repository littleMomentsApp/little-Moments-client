import axios from "axios";
import { useState } from "react";

const API_URL = "http://localhost:5005/api";

function AddProduct() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { title, image, description, category, price };
    const storedToken = localStorage.getItem("authToken");

    axios
      .post(`${API_URL}/products`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setTitle("");
        setImage("");
        setDescription("");
        setCategory("");
        setPrice(0);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h3>Create new product</h3>

      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label>
          Image:
          <input
            name="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </label>

        <label>
          Description:
          <input
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Category:
          <input
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </label>

        <label>
          Price:
          <input
            type="number"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
