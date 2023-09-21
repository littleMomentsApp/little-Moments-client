import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

const baseUrl = process.env.REACT_APP_SERVER_URL || "/";

function AddList({ refreshList }) {
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
      .post(`${baseUrl}/api/lists`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setTitle("");
        setDescription("");
        setDate("");
        setProducts([]);
        refreshList();
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
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon">
                <i className="fas fa-pencil-alt prefix"></i>
              </span>
            </div>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="1"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></textarea>
          </div>
        </label>
        <label>
          Description:
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon">
                <i className="fas fa-pencil-alt prefix"></i>
              </span>
            </div>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="1"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </label>

        <div>
          <div className="row">
            <div className="col-md-2 mx-auto">
              <Form.Group controlId="dob">
                <Form.Label>Select Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  placeholder="Date of List"
                  min={currentDate}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Form.Group>
            </div>
          </div>
        </div>

        <Button className="mt-3" variant="outline-success" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
export default AddList;
