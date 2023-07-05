import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useContext } from "react";
import { ThemeContext } from "../context/theme.context";

const baseUrl = process.env.REACT_APP_SERVER_URL || "/";

function EditListPage(props) {
  const { theme } = useContext(ThemeContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [addedProducts, setAddedProducts] = useState([]);
  const currentDate = new Date().toISOString().split("T")[0];
  const { listId } = useParams();
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    getList();
    // eslint-disable-next-line
  }, [listId]);
  // get details of user list
  const getList = () => {
    axios
      .get(`${baseUrl}/api/lists/${listId}`)
      .then((response) => {
        const oneList = response.data;
        setTitle(oneList.title);
        setDescription(oneList.description);
        setDate(oneList.date);
        setProducts(oneList.products); // array Obj products
        setAddedProducts([
          ...oneList.products.map((element) => {
            return element._id; // array of productIds
          }),
        ]);
      })
      .then((response) => {
        getAllProducts();
      })
      .catch((error) => console.log(error));
  };

  function handleDelete(pizza) {
    const newProduct = addedProducts.filter((element) => element !== pizza);
    setAddedProducts(newProduct);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("addList", addedProducts);
    const requestBody = { title, description, date, addedProducts };
    console.log(requestBody);

    axios
      .put(`${baseUrl}/api/lists/${listId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        getList();
      });
  };

  const getAllProducts = () => {
    axios
      .get(`${baseUrl}/api/products`)
      .then((allProducts) => {
        setAllProducts(allProducts.data);
      })
      .catch((e) => console.log(e));
  };

  const addProduct = (productId) => {
    setAddedProducts([productId, ...addedProducts]);
  };

  return (
    <div className={"EditListPage " + theme}>
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
          products.map((productObj, index) => (
            <div key={index}>
              <ProductCard {...productObj} />
              {/* <button onClick={handleDelete}
              > */}
              <button
                onClick={() => {
                  handleDelete(productObj._id);
                }}
              >
                Remove Product
              </button>
            </div>
          ))}
        <br />
        <hr />
        <button type="submit">Update</button>
        <hr />
        <br />
      </form>

      {allProducts.map((productO, index) => {
        return (
          <ul key={index}>
            <h3>{productO.title}</h3>
            <img src={productO.imageURL} alt="product-alt" />
            <p>{productO.description}</p>
            <h4>{productO.quantity}</h4>
            <p>{productO.category}</p>
            <h4>Price: {productO.price}$ </h4>
            <button
              onClick={(e) => {
                return addProduct(productO._id, e);
              }}
            >
              Add to List
            </button>
          </ul>
        );
      })}
    </div>
  );
}
export default EditListPage;
