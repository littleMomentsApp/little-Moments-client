import axios from "axios";
import { useEffect, useState } from "react";
import ListCard from "../components/ListCard";
import AddList from "../components/AddList";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { ThemeContext } from "../context/theme.context";

const baseUrl = process.env.REACT_APP_SERVER_URL || "/";

function ListPage() {
  const [listToDisplay, setListToDisplay] = useState([]);
  const [isShown, setIsShown] = useState(false);

  const { isLoggedIn } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const getLists = () => {
    axios
      .get(`${baseUrl}/api/lists`)
      .then((response) => {
        setListToDisplay(response.data);
      })
      .catch((e) => console.log("error to get list for the list page", e));
  };

  useEffect(() => {
    getLists();
  }, []);

  const handleClick = (e) => {
    setIsShown((current) => !current);
  };

  return (
    <div className={"ListPage " + theme}>
      <h1>ListPage</h1>
      {isLoggedIn && (
        <div>
          <button onClick={handleClick}>Create a List</button>
          {isShown ? <AddList refreshList={getLists} /> : null}
        </div>
      )}
      {/* {isLoggedIn && */}
      {listToDisplay.map((listObj) => (
        <ListCard key={listObj._id} {...listObj} />
      ))}
    </div>
  );
}

export default ListPage;
