import axios from "axios";
import { useEffect, useState } from "react";
import ListCard from "../components/ListCard";
import AddList from "../components/AddList";

const API_URL = "http://localhost:5005/api/lists";

function ListPage() {
  const [listToDisplay, setListToDisplay] = useState([]);

  const getLists = () => {
    axios
      .get(API_URL)
      .then((response) => {
        setListToDisplay(response.data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getLists();
  }, []);

  return (
    <div className="ListPage">
      <h1>ListPage</h1>

      <AddList refreshList={getLists} />

      {/* {isLoggedIn && */}
      {listToDisplay.map((listObj) => (
        <ListCard key={listObj._id} {...listObj} />
      ))}
    </div>
  );
}

export default ListPage;
