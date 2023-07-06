import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/theme.context";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import AddProduct from "../components/AddProduct";
import { Button, Row, Container, Col } from "react-bootstrap";
import Search from "../components/Search";

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
        setUpdatedProducts(response.data);
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
    <div>
      <Search filterProductHandler={filterProductList} />

      <div className="AddProduct">
        {isLoggedIn && (
          <Button variant="secondary" onClick={handleClickAdd} className="mt-3">
            Create a Product
          </Button>
        )}
        {isShown ? <AddProduct refreshProducts={getAllProducts} /> : null}
      </div>
      <Container>
        <Row>
          {updatedProducts.map((productObj, index) => {
            return (
              <Col xs={3} md={6} key={index}>
                <ProductCard {...productObj} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default DisplayProducts;
