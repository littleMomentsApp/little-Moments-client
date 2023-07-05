import axios from "axios";
import { useState } from "react";

const API_URL = "http://localhost:5005/api";

function AddProduct({ refreshList }) {
  const [title, setTitle] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      title,
      imageURL,
      description,
      quantity,
      category,
      price,
    };
    const storedToken = localStorage.getItem("authToken");

    axios
      .post(`${API_URL}/products`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setTitle("");
        setImageURL("");
        setDescription("");
        setQuantity(0);
        setCategory("");
        setPrice(0);
        refreshList();
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
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
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
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
          Quantity:
          <input
            type="number"
            name="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
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
    </>
  );
}

export default AddProduct;
