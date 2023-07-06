import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { Button, Col, Row, Container } from "react-bootstrap";

const baseUrl = process.env.REACT_APP_SERVER_URL || "/";

function ListDetailsPage() {
  const [list, setList] = useState({});
  const [updatedQuantity, setUpdatedQuantity] = useState(null);
  const { listId } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  const storedToken = localStorage.getItem("authToken");

  const getOneList = () => {
    axios
      .get(`${baseUrl}/api/lists/${listId}`)
      .then((oneList) => {
        // console.log(oneList.data);
        setList(oneList.data);
      })
      .catch((e) => console.log("failed to get one list", e));
  };

  useEffect(() => {
    getOneList();
    // eslint-disable-next-line
  }, []);

  const handleBuyNow = (prodId, quantityNow) => {
    if (quantityNow > 0) {
      const newQuantity = quantityNow - 1;
      console.log("newQuantity.......", newQuantity);

      axios
        .put(
          `${baseUrl}/api/products/${prodId}`,
          { quantity: newQuantity },
          { new: true }
        )
        .then((response) => {
          setUpdatedQuantity(response.data.quantity);
          getOneList();
          console.log(updatedQuantity);
        })
        .catch((err) => {
          console.log("failed to updated quantity..", err);
        });
    } else {
      console.log("Quantity = 0, no products available");
    }
  };

  const deleteList = () => {
    axios
      .delete(`${baseUrl}/api/lists/${listId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })

      .then((response) => {
        navigate("/lists");
        console.log("list deleted....", listId);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {isLoggedIn && (
        <>
          <Link to={`/lists/edit/${listId}`}>
            <Button variant="success">Edit List</Button>
          </Link>

          <Button variant="warning" onClick={deleteList}>
            {" "}
            Delete List{" "}
          </Button>
        </>
      )}
      <h3>{list.title}</h3>
      <Container>
        <Row>
          {list.products &&
            list.products.map((productObj, index) => {
              // console.log(productObj);
              return (
                <Col xs={3} md={6} key={index}>
                  <ProductCard
                    {...productObj}
                    list={listId}
                    handleBuy={handleBuyNow}
                  />
                </Col>
              );
            })}
        </Row>
      </Container>
    </div>
  );
}

export default ListDetailsPage;
