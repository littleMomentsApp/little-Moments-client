//import { useContext } from "react";
//import { ThemeContext } from "../../context/theme.context";
import MobileNav from "./MobileNav";
import Navigation from "./Navigation";
import classes from "./navbar.module.css";

function Navbar() {
  // const { theme } = useContext(ThemeContext);

  return (
    <nav className={classes.Navbar}>
      <div className={classes.logo}>
        <h2>
          <a href="/">Little Moments</a>
        </h2>
      </div>
      <MobileNav />
      <Navigation />
    </nav>
  );
}

export default Navbar;
