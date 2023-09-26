import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";
import styles from "./navbar.module.css";
import { Button } from "react-bootstrap";

const NavLinks = (props) => {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  return (
    <section className={styles.NavLinks}>
      <ul className={styles.NavLinksList}>
        <li onClick={() => props.isMobile && props.closeMenu()}>
          <a href="/about">About Us</a>
        </li>
        <li onClick={() => props.isMobile && props.closeMenu()}>
          <a href="/lists">Lists</a>
        </li>
        <li onClick={() => props.isMobile && props.closeMenu()}>
          <a href="/products">Products</a>
        </li>
      </ul>
      {!isLoggedIn && (
        <div className={styles.button_container}>
          <Button
            className={styles.button}
            onClick={() => props.isMobile && props.closeMenu()}
          >
            <a href="/login">Login </a>
          </Button>
          <Button
            className={styles.button}
            onClick={() => props.isMobile && props.closeMenu()}
          >
            <a href="/signup">SignUp</a>
          </Button>
        </div>
      )}

      {isLoggedIn && (
        <div className={styles.button_container}>
          <Button className={styles.button} onClick={logOutUser}>
            Log Out
          </Button>
        </div>
      )}
    </section>
  );
};

export default NavLinks;
