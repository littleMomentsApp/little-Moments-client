import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005/api/lists";

function ListDetailsPage() {
  const {storeToken, authenticateUser} = useContext(AuthContext);
  const [list, setList] = useState({});
  const { listId } = useParams();
  const navigate = useNavigate();
  const getOneList = () => {
    axios
      .get(`${API_URL}/${listId}`)
      .then((theList) => {
        const oneList = theList.data;
        console.log(oneList);
        setList(oneList);
      })
      .catch((e) => console.log("failed to get one list", e));
  };

  useEffect(() => {
    getOneList();
    // eslint-disable-next-line
  }, []);

  const deleteList = () => {
    axios
      .delete(`${API_URL}/${listId}`)
      
      .then((response) => {
        storeToken(response.data.authToken)
        authenticateUser();
        navigate("/lists");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="ListDetailsPage">
      <h3>{list.title}</h3>
      <p>{list.description}</p>
      <h4>{list.date}</h4>
      {list.products &&
        list.products.map((productObj) => (
          <ProductCard key={productObj._id} {...productObj} />
        ))}
      <Link to={`/lists/edit/${listId}`}>
        <button>Edit List</button>
      </Link>

      
      <button onClick={deleteList}> Delete List </button>
      
    </div>
  );
}

export default ListDetailsPage;
