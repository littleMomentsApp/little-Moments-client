import axios from "axios";
import { useEffect, useState } from "react";
import ListCard from "../components/ListCard";
import AddList from "../components/AddList";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { ThemeContext } from "../context/theme.context";
import { Button } from "react-bootstrap";

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
    <>
    {isLoggedIn && (
      <div className="mb-5">
        <h1>ListPage</h1>
        <Button onClick={handleClick}>Create a List</Button>
        {isShown ? <AddList refreshList={getLists} /> : null}      
        </div>

      )}
     
    <div style={{display: "flex", flexDirection: "row"}} className={"gap-5 ListPage " + theme}>
    
      
      {/* {isLoggedIn && */}
      {listToDisplay.map((listObj) => (
        <ListCard key={listObj._id} {...listObj} />
      ))}
    </div>
    </>
  );
}


export default ListPage;
