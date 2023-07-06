import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/theme.context";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import AddProduct from "../components/AddProduct";
import { Button } from "react-bootstrap";
import Search from '../components/Search';

const baseUrl = process.env.REACT_APP_SERVER_URL || "/";

function DisplayProducts(props) {
  const { theme } = useContext(ThemeContext);
  const { isLoggedIn } = useContext(AuthContext);

  const [allProducts, setAllProducts] = useState([]);
  const [isShown, setIsShown] = useState(false);
  const [updatedProducts, setUpdatedProducts] = useState(allProducts);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = () => {
    axios
      .get(`${baseUrl}/api/products`)
      .then((response) => {
        setAllProducts(response.data);
        setUpdatedProducts(response.data)
        // console.log(response.data);
      })
      .catch((e) => console.log("error to get all products to display...", e));
  };

  const filterProductList = (char) => {
    let filteredProducts;

    if (char === "") {
      filteredProducts = allProducts;
    } else {
      filteredProducts = updatedProducts.filter((eachProduct) => {
        return eachProduct.category.toLowerCase().includes(char.toLowerCase());
      });
    }
    setUpdatedProducts(filteredProducts);
  };
  const handleClickAdd = (e) => {
    setIsShown((current) => !current);
  };

  return (
    <div className={"DisplayProducts " + theme}>
     <Search filterProductHandler={filterProductList} />

      <div className="AddProduct">
        {isLoggedIn && (
          <Button variant="outline-info" onClick={handleClickAdd}>Create a Product</Button>
        )}
        {isShown ? <AddProduct refreshProducts={filterProductList} /> : null}
      </div>
      {updatedProducts.map((productObj, index) => {
        return <ProductCard {...productObj} />;
      })}
    </div>
  );
}

export default DisplayProducts;
