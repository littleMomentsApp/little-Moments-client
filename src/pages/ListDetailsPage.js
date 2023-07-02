import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const API_URL = "http://localhost:5005/api/lists";

function ListDetailsPage() {
  const [list, setList] = useState({});
  const { listId } = useParams();
  const navigate = useNavigate();
  const storedToken = localStorage.getItem("authToken");
  const getOneList = () => {
    axios
      .get(`${API_URL}/${listId}`)
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

  const deleteList = () => {
    axios
      .delete(`${API_URL}/${listId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })

      .then((response) => {
        navigate("/lists");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="ListDetailsPage">
      <h3>{list.title}</h3>
      <h4>{list.date}</h4>
      <p>{list.description}</p>
      {list.products &&
        list.products.map((productObj) => {
          console.log(productObj);
          return <ProductCard key={productObj._id} {...productObj} />;
        })}
      <Link to={`/lists/edit/${listId}`}>
        <button>Edit List</button>
      </Link>

      <button onClick={deleteList}> Delete List </button>
    </div>
  );
}

export default ListDetailsPage;
