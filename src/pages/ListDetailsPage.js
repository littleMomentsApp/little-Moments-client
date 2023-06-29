import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const API_URL = "http://localhost:5005/api/lists";

function ListDetailsPage() {
  const [list, setList] = useState({});
  const { listId } = useParams();

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

  return (
    <div className="ListDetailsPage">
      <h3>{list.title}</h3>
      <p>{list.description}</p>
      <h4>{list.date}</h4>
      {list.products &&
        list.products.map((productObj) => (
          <ProductCard key={productObj._id} {...productObj} />
        ))}
    </div>
  );
}

export default ListDetailsPage;
