import React from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavLink style={{ color: "#15cdfc" }} to="/">
          <b>FoodHub</b>
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to="/about" activeStyle>
            About
          </NavLink>

          <NavLink to="/register-restaurant" activeStyle>
            Add Restaurant
          </NavLink>

          <NavLink id="hero-cart" to="/cart" activeStyle>
            <i className="bi bi-cart" style={{ fontSize: "2rem" }} />
          </NavLink>

          <NavBtn>
            <NavBtnLink to="/signin">Sign In</NavBtnLink>
          </NavBtn>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
