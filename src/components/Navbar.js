import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import { ThemeContext } from "../context/theme.context";
import { Nav, Button } from "react-bootstrap";
import Hamburger from "./Hamburger";
import { useState } from "react";

function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  const { theme, toggleTheme } = useContext(ThemeContext);

  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const toggleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen);
  };

  return (
    <div className={"Navbar " + theme}>
      <Nav>
        <div className="logo">
          <a href="/">
            <h1>Little Moments</h1>
          </a>
        </div>
        <ul>
          <li>
            <a href="/about">About Us</a>
          </li>
          <li>
            <a href="/lists">Lists</a>
          </li>
          <li>
            <a href="/products">Products</a>
          </li>
          {!isLoggedIn && (
            <>
              <li>
                <a href="/login">Login </a>
              </li>
              <li>
                <a href="/signup">SignUp</a>
              </li>
            </>
          )}
          {isLoggedIn && <li onClick={logOutUser}>Log Out</li>}
        </ul>

        <Button variant="outline-dark" onClick={toggleTheme}>
          {theme === "light" ? "Dark 🌜" : "Light 🟡"}
        </Button>

        <>
          <div className="hamburger" onClick={toggleHamburger}>
            <Hamburger isOpen={hamburgerOpen} />
          </div>
        </>
      </Nav>
    </div>
  );
}

export default Navbar;
