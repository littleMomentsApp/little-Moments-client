import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import { ThemeContext } from "../context/theme.context";
import { useNavigate } from "react-router-dom";
import { Nav, Button } from "react-bootstrap";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const { theme, toggleTheme } = useContext(ThemeContext);

  const routeChangeAbout = () => {
    navigate("/about");
  };
  const routeChangeLists = () => {
    navigate("/lists");
  };
  const routeChangeProducts = () => {
    navigate("/products");
  };
  const routeChangeLogin = () => {
    navigate("/login");
  };
  const routeChangeSignUp = () => {
    navigate("/signup");
  };

  return (
    <Nav className={"Navbar " + theme}>
      <div className="logo">
        <a href="/">
          <h1>Little Moments</h1>
        </a>
      </div>
      <div className="RouteBtn">
        <Button variant="outline-dark" onClick={routeChangeAbout}>
          About Us
        </Button>
        <Button variant="outline-dark" onClick={routeChangeLists}>
          Lists
        </Button>
        <Button variant="outline-dark" onClick={routeChangeProducts}>
          Products
        </Button>
      </div>
      <Button variant="outline-dark" onClick={toggleTheme}>
        {theme === "light" ? "Dark 🌜" : "Light 🟡"}
      </Button>
      <div id="UserBtn">
        {!isLoggedIn && (
          <>
            <Button variant="outline-dark" onClick={routeChangeLogin}>
              Login
            </Button>
            <Button variant="outline-dark" onClick={routeChangeSignUp}>
              SignUp
            </Button>{" "}
          </>
        )}

        {isLoggedIn && (
          <>
            <Button variant="outline-danger" onClick={logOutUser}>
              Logout
            </Button>
            <div id="userMessage">
              <p>{user && "Hello, " + user.name}</p>
            </div>
          </>
        )}
      </div>
    </Nav>
  );
}

export default Navbar;
