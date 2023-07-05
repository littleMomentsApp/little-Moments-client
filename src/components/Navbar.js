import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import { ThemeContext } from "../context/theme.context";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const { theme, toggleTheme } = useContext(ThemeContext);

  
  const routeChangeHome=()=> {
    navigate("/")
  }
  const routeChangeLists=()=> {
    navigate("/lists")
  }

  return (
    <nav className={"Navbar " + theme}>
      <Button variant="secondary" onClick={routeChangeHome}>Home</Button>
      <Button variant="secondary" onClick={routeChangeLists}>Lists</Button>
      {isLoggedIn && (
        <>
          <Button variant="secondary" onClick={logOutUser}>
            Logout
          </Button>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">SignUp</Link>
        </>
      )}

      <Button variant="secondary" onClick={toggleTheme}>
        {theme === "light" ? "dark 🌜" : "light 🟡"}
      </Button>
    </nav>
  );
}

export default Navbar;
