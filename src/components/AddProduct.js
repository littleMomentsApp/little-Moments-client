import axios from "axios";
import { useEffect, useState } from "react";
import service from "../api/service";

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
          <input type="file" onChange={(e) => handleFileUpload(e)} />
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
          {/* {categories.map(element => {

          })
          } */}
          Category:
          <select
            value={category}
            placeholder="Select"
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            {categories.map((element, index) => {
              return (
                <option key={index} value={element}>
                  {element}
                </option>
              );
            })}
          </select>
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
