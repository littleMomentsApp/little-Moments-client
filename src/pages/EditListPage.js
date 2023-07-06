import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { Button } from "react-bootstrap";

const baseUrl = process.env.REACT_APP_SERVER_URL || "/";

function EditListPage(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [products, setProducts] = useState([]); // my
  const [allProducts, setAllProducts] = useState([]); // all DB
  const [addedProducts, setAddedProducts] = useState([]);// array ids my products
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

  function handleDelete(pizza, e) {
    console.log('why are you not working now?', pizza)
    const newProduct = products.filter((element) => element._id !== pizza);
    setProducts(newProduct);
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
    <div>
      <h3>Edit your List</h3>

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
        {/* MY PRODUCTS */}
        {products &&
          products.map((productObj, index) => (
            <div key={index} className="ProductCardDiv">
              <ProductCard {...productObj}
              deleteProduct={handleDelete}
              />
             
             
            </div>
          ))}
        <br />
        <Button variant="outline-secondary" type="submit">Update</Button>
        <br /> <br />
      </form>

      {allProducts.map((productO, index) => {
        return (
          <ul key={index}>
            <h3>{productO.title}</h3>
            <img className="imageProduct" src={productO.imageURL} alt="product-alt" />
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
