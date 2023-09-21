import React, { useState } from "react";
import NavLinks from "./NavLinks";
import classes from "./navbar.module.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { CgClose } from "react-icons/cg";

function MobileNav() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const hamburgerIcon = (
    <RxHamburgerMenu
      className={classes.Hamburger}
      size="35px"
      color="dark"
      onClick={(e) => {
        handleClick(e);
      }}
    />
  );

  const closeIcon = (
    <CgClose
      className={classes.Hamburger}
      size="35px"
      color="dark"
      onClick={(e) => {
        handleClick(e);
      }}
    />
  );

  const closeMobileMenu = () => {
    setOpen(!open);
  };

  return (
    <nav className={classes.MobileNav}>
      {open ? closeIcon : hamburgerIcon}
      {open && <NavLinks isMobile={true} closeMenu={closeMobileMenu} />}
    </nav>
  );
}
export default MobileNav;
