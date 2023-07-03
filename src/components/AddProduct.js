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

  return <div></div>;
}

export default AddProduct;
