import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import { ThemeContext } from "../context/theme.context";
import { Link } from "react-router-dom";

function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className={"Navbar " + theme}>
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/lists">
        <button>Lists</button>
      </Link>
      <button className="theme-btn" onClick={toggleTheme}>
        {theme === "light" ? "dark 🌜" : "light 🟡"}
      </button>
      {isLoggedIn && (
        <>
          <button onClick={logOutUser}>Logout</button>
          <hr />
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/signup">
            <button>SignUp</button>
          </Link>
          <br />
          <hr />
        </>
      )}
    </nav>
  );
}

export default Navbar;
