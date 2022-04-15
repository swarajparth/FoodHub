import React, { useContext, useEffect } from "react";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { UserContext } from "../../App";
import {
  Nav,
  NavLink,
  Bars,
  BarsNavBtnLink,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { state, dispatch } = useContext(UserContext);
  const { state2, dispatch2 } = useContext(UserContext);
  const { refresh, setRefresh } = useContext(UserContext);

  const cartItems = () => {
    if (!sessionStorage.getItem("cartDishes")) {
      return 0;
    } else {
      const x = JSON.parse(sessionStorage.getItem("cartDishes"));
      return x.length;
    }
  };

  const RenderMenu = () => {
    useEffect(() => {
      if (state) {
        cartItems();
      }
    }, [refresh]);

    if (state) {
      return (
        <>
          <Nav>
            <NavLink to="/">
              <b>FoodHub</b>
            </NavLink>

            <div>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <Bars />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <BarsNavBtnLink to="/about">
                  <MenuItem
                    style={{ justifyContent: "center" }}
                    onClick={handleClose}
                  >
                    About
                  </MenuItem>
                </BarsNavBtnLink>

                <BarsNavBtnLink to="/account">
                  <MenuItem
                    style={{ justifyContent: "center" }}
                    onClick={handleClose}
                  >
                    Account
                  </MenuItem>
                </BarsNavBtnLink>

                <BarsNavBtnLink to="/cart">
                  <MenuItem
                    style={{ justifyContent: "center" }}
                    onClick={handleClose}
                  >
                  <Badge color="secondary" badgeContent={cartItems()}>
                  Cart
                  </Badge>
                  </MenuItem>
                </BarsNavBtnLink>

                <BarsNavBtnLink to="/signout">
                  <MenuItem
                    style={{ justifyContent: "center" }}
                    onClick={handleClose}
                  >
                    Sign Out
                  </MenuItem>
                </BarsNavBtnLink>
              </Menu>
            </div>

            <NavMenu>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/account">Account</NavLink>

              <NavLink id="hero-cart" to="/cart">
                <Badge color="secondary" badgeContent={cartItems()}>
                  <i className="bi bi-cart" style={{ fontSize: "2rem" }} />
                </Badge>
              </NavLink>

              <NavBtn>
                <NavBtnLink to="/signout">Sign Out</NavBtnLink>
              </NavBtn>
            </NavMenu>
          </Nav>
        </>
      );
    } else if (state2) {
      return (
        <>
          <Nav>
            <NavLink to="/">
              <b>FoodHub</b>
            </NavLink>

            <div>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <Bars />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <BarsNavBtnLink to="/about">
                  <MenuItem
                    style={{ justifyContent: "center" }}
                    onClick={handleClose}
                  >
                    About
                  </MenuItem>
                </BarsNavBtnLink>

                <BarsNavBtnLink to="/account-restaurant">
                  <MenuItem
                    style={{ justifyContent: "center" }}
                    onClick={handleClose}
                  >
                    Account
                  </MenuItem>
                </BarsNavBtnLink>

                <BarsNavBtnLink to="/orders">
                  <MenuItem
                    style={{ justifyContent: "center" }}
                    onClick={handleClose}
                  >
                    Orders
                  </MenuItem>
                </BarsNavBtnLink>

                <BarsNavBtnLink to="/signout-restaurant">
                  <MenuItem
                    style={{ justifyContent: "center" }}
                    onClick={handleClose}
                  >
                    Sign Out
                  </MenuItem>
                </BarsNavBtnLink>
              </Menu>
            </div>

            <NavMenu>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/account-restaurant">Account</NavLink>
              <NavLink to="/orders">Orders</NavLink>

              <NavBtn>
                <NavBtnLink to="/signout-restaurant">Sign Out</NavBtnLink>
              </NavBtn>
            </NavMenu>
          </Nav>
        </>
      );
    } else {
      return (
        <Nav>
          <NavLink to="/">
            <b>FoodHub</b>
          </NavLink>

          <div>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <Bars />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <BarsNavBtnLink to="/about">
                <MenuItem
                  style={{ justifyContent: "center" }}
                  onClick={handleClose}
                >
                  About
                </MenuItem>
              </BarsNavBtnLink>

              <BarsNavBtnLink to="/register-restaurant">
                <MenuItem
                  style={{ justifyContent: "center" }}
                  onClick={handleClose}
                >
                  Add Restaurant
                </MenuItem>
              </BarsNavBtnLink>

              <BarsNavBtnLink to="/cart">
                <MenuItem
                  style={{ justifyContent: "center" }}
                  onClick={handleClose}
                >
                  <Badge color="secondary" badgeContent={cartItems()}>
                  Cart
                  </Badge>
                </MenuItem>
              </BarsNavBtnLink>

              <BarsNavBtnLink to="/register">
                <MenuItem
                  style={{ justifyContent: "center" }}
                  onClick={handleClose}
                >
                  Sign Up
                </MenuItem>
              </BarsNavBtnLink>

              <BarsNavBtnLink to="/signin">
                <MenuItem
                  style={{ justifyContent: "center" }}
                  onClick={handleClose}
                >
                  Sign In
                </MenuItem>
              </BarsNavBtnLink>
            </Menu>
          </div>

          <NavMenu>
            <NavLink to="/about">About</NavLink>

            <NavLink to="/register-restaurant">Add Restaurant</NavLink>

            <NavLink id="hero-cart" to="/cart">
              <Badge color="secondary" badgeContent={cartItems()}>
                <i className="bi bi-cart" style={{ fontSize: "2rem" }} />
              </Badge>
            </NavLink>

            <NavLink to="/register">Sign Up</NavLink>

            <NavBtn>
              <NavBtnLink to="/signin">Sign In</NavBtnLink>
            </NavBtn>
          </NavMenu>
        </Nav>
      );
    }
  };

  return (
    <>
      <RenderMenu />
    </>
  );
};

export default Navbar;
