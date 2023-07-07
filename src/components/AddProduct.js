import axios from "axios";
import { useEffect, useState } from "react";
import service from "../api/service";
import { Button, Form, InputGroup, FormControl } from "react-bootstrap";
import { MDBFile } from "mdb-react-ui-kit";

const API_URL = "http://localhost:5005/api";

function AddProduct({ refreshProducts }) {
  const [title, setTitle] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState(["other"]);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line
  }, []);

  const getCategories = (e) => {
    axios.get(`${API_URL}/product-category`).then((enumArr) => {
      setCategories(enumArr.data);
      //console.log("this is the enumArr...", enumArr.data);
    });
  };

  const handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();

    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("imageURL", e.target.files[0]);

    service
      .uploadImage(uploadData)
      .then((response) => {
        // console.log("response is: ", response);
        // response carries "fileUrl" which we can use to update the state
        setImageURL(response.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

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
        refreshProducts();
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <h3>Create new product</h3>

      <form className="formAddProduct" onSubmit={handleSubmit}>
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

        <div className="fileUploader">
          <MDBFile
            label="Select a picture to upload"
            size="sm"
            id="formFileSm"
            onChange={(e) => handleFileUpload(e)}
          />

          <label>
            Quantity:
            <InputGroup>
              <FormControl
                type="number"
                name="number"
                value={quantity}
                min={0}
                max={50}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </InputGroup>
          </label>

          <label>
            {/* {categories.map(element => {

          })
          } */}
            Category:
            <Form.Control
              required
              className="ms-1"
              name="category"
              as="select"
              placeholder="Category"
              onChange={(e) => setCategory(e.target.value)}
            >
              {" "}
              <option hidden value="" selected>
                {" "}
                Select{" "}
              </option>{" "}
              {categories.map((element, index) => {
                return (
                  <option key={index} value={element}>
                    {element}
                  </option>
                );
              })}{" "}
            </Form.Control>
          </label>

          <label>
            Price:
            <InputGroup>
              <FormControl
                type="number"
                name="price"
                value={price}
                min={0}
                onChange={(e) => setPrice(e.target.value)}
              />
            </InputGroup>
          </label>
        </div>
        <Button className="mt-2" variant="outline-success" type="submit">
          Add Product
        </Button>
      </form>
    </>
  );
}

export default AddProduct;
