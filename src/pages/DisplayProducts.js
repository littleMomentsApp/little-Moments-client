import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/theme.context";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import AddProduct from "../components/AddProduct";
import { Button } from "react-bootstrap";

const baseUrl = process.env.REACT_APP_SERVER_URL || "/";

function DisplayProducts(props) {
  const { theme } = useContext(ThemeContext);
  const { isLoggedIn } = useContext(AuthContext);

  const [allProducts, setAllProducts] = useState([]);
  const [isShown, setIsShown] = useState(false);
  const [category, setCategory] = useState("");

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = () => {
    axios
      .get(`${baseUrl}/api/products`)
      .then((response) => {
        setAllProducts(response.data);
        console.log(response.data);
      })
      .catch((e) => console.log("error to get all products to display...", e));
  };

  const handleSearch = (e) => {
    allProducts.filter();
  };

  const handleClickAdd = (e) => {
    setIsShown((current) => !current);
  };

  return (
    <div className={"DisplayProducts " + theme}>
      <form class="search-bar" onSubmit={handleSearch}>
        <input
          className="Search"
          type="text"
          value={category}
          placeholder="Filter by category"
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        />
        <button class="btn-filter">Search</button>
      </form>

      <div className="AddProduct">
        {isLoggedIn && (
          <Button onClick={handleClickAdd}>Create a Product</Button>
        )}
        {isShown ? <AddProduct refreshProducts={getAllProducts} /> : null}
      </div>
      {allProducts.map((productObj, index) => {
        return <ProductCard {...productObj} />;
      })}
    </div>
  );
}

export default DisplayProducts;
