import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";

function AddList(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [products, setProducts] = useState([]);
  const currentDate = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { title, description, date, products };
    const storedToken = localStorage.getItem("authToken");

    axios
      .post(`${API_URL}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setTitle("");
        setDescription("");
        setDate("");
        setProducts([]);
        props.refresh();
        navigate("/lists");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddList">
      <h3>Add a new List</h3>

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
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
export default AddList;
