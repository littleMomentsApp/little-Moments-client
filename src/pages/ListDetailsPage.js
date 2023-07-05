import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { ThemeContext } from "../context/theme.context";
import { Button } from "react-bootstrap";

const baseUrl = process.env.REACT_APP_SERVER_URL || "/";

function ListDetailsPage() {
  const { theme } = useContext(ThemeContext);
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
    <div className={"ListDetailsPage " + theme}>
      {isLoggedIn && (
        <>
          <Link to={`/lists/edit/${listId}`}>
            <Button>Edit List</Button>
          </Link>

          <Button onClick={deleteList}> Delete List </Button>
        </>
      )}
      <h3>{list.title}</h3>
      <h4>{list.date}</h4>
      <p>{list.description}</p>
      {list.products &&
        list.products.map((productObj) => {
          // console.log(productObj);
          return (
            <>
            
              <ProductCard key={productObj._id} {...productObj} handleBuy={handleBuyNow} />
              
            </>
          );
        })}
    </div>
  );
}

export default ListDetailsPage;
