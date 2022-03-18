import React, { useContext } from "react";
import { UserContext } from "../../App";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";

const Navbar = () => {

  const {state, dispatch } = useContext(UserContext);
  const {state2, dispatch2 } = useContext(UserContext);

  const RenderMenu = () =>{
    if(state){
      return(
        <>
          <Nav>
        <NavLink to="/">
          <b>FoodHub</b>
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to="/about">
            About
          </NavLink>
          <NavLink to="/account">
            Account
          </NavLink>

          <NavLink id="hero-cart" to="/cart" >
            <i className="bi bi-cart" style={{ fontSize: "2rem" }} />
          </NavLink>
        
          <NavBtn>
            <NavBtnLink to="/signout">Sign Out</NavBtnLink>
          </NavBtn>
        </NavMenu>
      </Nav>
        </>
      )
    } else if(state2){
      return(
        <>
          <Nav>
        <NavLink to="/">
          <b>FoodHub</b>
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to="/about">
            About
          </NavLink>
          <NavLink to="/account-restaurant">
            Account
          </NavLink>
          <NavLink to="/orders">
            Orders
          </NavLink>
        
          <NavBtn>
            <NavBtnLink to="/signout-restaurant">Sign Out</NavBtnLink>
          </NavBtn>
        </NavMenu>
      </Nav>
        </>
      )
    } else{
      return (
        <Nav>
        <NavLink to="/">
          <b>FoodHub</b>
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to="/about">
            About
          </NavLink>

          <NavLink to="/register-restaurant">
            Add Restaurant
          </NavLink>

          <NavLink to="/register">
            Sign Up
          </NavLink>

          <NavBtn>
            <NavBtnLink to="/signin">Sign In</NavBtnLink>
          </NavBtn>
        </NavMenu>
      </Nav>
      )
    }
  }

  return (
    <>
    <RenderMenu/>
    </>
  );
};

export default Navbar;
