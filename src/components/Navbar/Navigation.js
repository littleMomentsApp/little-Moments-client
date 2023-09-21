import NavLinks from "./NavLinks";
import classes from "./navbar.module.css";
import { useContext } from "react";
import { ThemeContext } from "../../context/theme.context";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import React from "react";

function Navigation() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <nav className={classes.Navigation}>
      <NavLinks />
      <button className={classes.themebtn} onClick={toggleTheme}>
        {theme === "light" ? (
          <BsMoonFill color="#333" />
        ) : (
          <BsSunFill color="#333" size="20px" />
        )}
      </button>
    </nav>
  );
}

export default Navigation;
