import axios from "axios";
import { useState } from "react";

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
      .post(`${process.env.REACT_APP_SERVER_URL}/api/products`, requestBody, {
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
