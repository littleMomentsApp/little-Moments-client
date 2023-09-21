import NavLinks from "./NavLinks";
import classes from "./navbar.module.css";
import { useContext } from "react";
import { ThemeContext } from "../../context/theme.context";
import React from "react";

function Navigation() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <nav className={classes.Navigation}>
      <NavLinks />
      <button className={classes.themebtn} onClick={toggleTheme}>
        {theme === "light" ? "🌜" : "🟡"}
      </button>
    </nav>
  );
}

export default Navigation;
