import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/lists">
        <button>Lists</button>
      </Link>
      {isLoggedIn && (
        <>
          <button onClick={logOutUser}>Logout</button>
          <br />
          <hr />
          <h2>{user && user.name}</h2>
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
