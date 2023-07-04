import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const baseUrl = process.env.REACT_APP_SERVER_URL || '/'

function EditListPage(props) {
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

  const getList = () => {
    axios
      .get(`${baseUrl}/api/lists/${listId}`)
      .then((response) => {
        const oneList = response.data;
        setTitle(oneList.title);
        setDescription(oneList.description);
        setDate(oneList.date);
        setProducts(oneList.products);
        setAddedProducts([
          ...oneList.products.map((element) => {
            return element._id;
          }),
        ]);
      })
      .then((response) => {
        getAllProducts();
      })
      .catch((error) => console.log(error));
  };

  const deleteProduct = (productId) => {
    axios
      .delete(`${baseUrl}/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((deleted) => {
        getList();
        console.log(`Product.....${deleted}`);
      })
      .catch((err) => console.log(err));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // setProducts([...products.map((element) => element._id), ...addedProducts]);
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

  const handleProduct = (productId) => {
    setAddedProducts([...addedProducts, productId]);
  };

  // console.log("addedProducts >>>", addedProducts, "products >>>", products);

  return (
    <div className="EditListPage">
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
            <div>
              <ProductCard key={index} {...productObj} />
              <button
                onClick={() => {
                  deleteProduct(productObj._id);
                }}
              >
                Delete Product
              </button>
            </div>
          ))}
        <button type="submit">Update</button>
      </form>

      {allProducts.map((productO) => {
        return (
          <>
            {" "}
            <h3>{productO.title}</h3>
            <img src={productO.image} alt="product-alt" />
            <p>{productO.description}</p>
            <p>{productO.category}</p>
            <h4>Price: {productO.price}$ </h4>
            <button onClick={() => handleProduct(productO._id)}>
              Add Product
            </button>
          </>
        );
      })}
    </div>
  );
}
export default EditListPage;
