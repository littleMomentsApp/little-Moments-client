import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { ThemeContext } from "../context/theme.context";

const baseUrl = process.env.REACT_APP_SERVER_URL || "/";

function ListDetailsPage() {
  const { theme } = useContext(ThemeContext);
  const [list, setList] = useState({});
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

  const deleteList = () => {
    axios
      .delete(`${baseUrl}/api/lists/${listId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })

      .then((response) => {
        navigate("/lists");
      })
      .catch((err) => console.log(err));
  };

  console.log(list.date);

  return (
    <div className={"ListDetailsPage " + theme}>
      {isLoggedIn && (
        <>
          <Link to={`/lists/edit/${listId}`}>
            <button>Edit List</button>
          </Link>

          <button onClick={deleteList}> Delete List </button>
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
              <ProductCard key={productObj._id} {...productObj} />

              <button>Buy Now</button>
            </>
          );
        })}
    </div>
  );
}

export default ListDetailsPage;
