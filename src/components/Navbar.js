import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import { ThemeContext } from "../context/theme.context";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const { theme, toggleTheme } = useContext(ThemeContext);

  const routeChangeHome = () => {
    navigate("/");
  };
  const routeChangeLists = () => {
    navigate("/lists");
  };
  const routeChangeProducts = () => {
    navigate("/products");
  };

  return (
    <nav className={"Navbar " + theme}>
      <Button variant="outline-secondary" onClick={routeChangeHome}>
        Home
      </Button>
      <Button variant="outline-secondary" onClick={routeChangeLists}>
        Lists
      </Button>
      <Button variant="outline-secondary" onClick={routeChangeProducts}>
        Products
      </Button>
      {isLoggedIn && (
        <>
          <Button variant="outline-danger" onClick={logOutUser}>
            Logout
          </Button>
          <p>{user && "Welcome " + user.name}</p>
        </>
      )}

      {!isLoggedIn && (
        <>
          <a href="/login"><Button variant="outline-secondary">Login</Button> </a>
          <a href="/signup"><Button variant="outline-success">SignUp</Button> </a>
        </>
      )}

      <Button variant="outline-dark" onClick={toggleTheme}>
        {theme === "light" ? "dark 🌜" : "light 🟡"}
      </Button>
    </nav>
  );
}

export default Navbar;
