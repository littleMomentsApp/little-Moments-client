import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";
import styles from "./navbar.module.css";

const NavLinks = (props) => {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  return (
    <ul className={styles.NavLinks}>
      <li onClick={() => props.isMobile && props.closeMenu()}>
        <a href="/about">About Us</a>
      </li>
      <li onClick={() => props.isMobile && props.closeMenu()}>
        <a href="/lists">Lists</a>
      </li>
      <li onClick={() => props.isMobile && props.closeMenu()}>
        <a href="/products">Products</a>
      </li>
      {!isLoggedIn && (
        <>
          <li onClick={() => props.isMobile && props.closeMenu()}>
            <a href="/login">Login </a>
          </li>
          <li onClick={() => props.isMobile && props.closeMenu()}>
            <a href="/signup">SignUp</a>
          </li>
        </>
      )}
      {isLoggedIn && <li onClick={logOutUser}>Log Out</li>}
    </ul>
  );
};

export default NavLinks;
