import React, { useEffect, useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserContext } from "../../App";

const Cart = () => {
  const navigate = useNavigate();

  const { state, dispatch } = useContext(UserContext);
  const [userData, setUserData] = useState({});
  const [restaurantData, setRestaurantData] = useState({});
  const [x, setX] = useState([]);
  const { refresh, setRefresh } = useContext(UserContext);

  const clear = () => {
    setX([]);
    sessionStorage.setItem("cartDishes", JSON.stringify([]));
    setRefresh(!refresh);
  };

  const deleteDish = (dishName) => {
    for (let index = 0; index < x.length; index++) {
      const item = x[index];

      if (item.name === dishName) {
        x.splice(index, 1);
        sessionStorage.setItem("cartDishes", JSON.stringify(x));
        setRefresh(!refresh);
        setX(x);
        return;
      }
    }
  };

  const fetchRestaurantDetails = async (items) => {
    try {
      const res = await fetch("/api/restaurantDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: items[0].restaurant_id }),
      });
      const data = await res.json();

      setRestaurantData(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getUserData = async () => {
    try {
      const res = await fetch("/api/get-user-data", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();

      if (!(res.status === 200)) {
        throw new Error(res.err);
      } else {
        setUserData(data);
      }
    } catch (err) {
      console.log(err);
      navigate("/signin");
    }
  };

  useEffect(() => {
    const items = sessionStorage.getItem("cartDishes");
    if (items) {
      const itemsJson = JSON.parse(items);

      if (itemsJson.length > 0) fetchRestaurantDetails(itemsJson);
      setX(itemsJson);
    }
    // getUserData();
  }, []);

  return (
    <div>
      <Navbar />

      <div
        className="card-cart"
        style={{
          margin: "5% 10%",
          boxShadow: "rgba(28, 28, 28, 0.35) 0px 0.4rem 1.8rem",
        }}
      >
        <div className="table-responsive">
          <h1>
            <b>Cart</b>
            <hr />
          </h1>
          <div className="Items" style={{ margin: "2%" }}>
            <table className="table">
              <thead className=" text-primary">
                <tr style={{ color: "#941919" }}>
                  <th>Name</th>
                  <th>Restaurant</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {x.length > 0 ? (
                  <>
                    {x.map((dish) => (
                      <tr>
                        <td>{dish.name}</td>
                        <td>{restaurantData.name}</td>
                        <td>{dish.quantity}</td>
                        <td>{dish.price}</td>
                        <td>{dish.amount}</td>
                        <>
                          <DeleteIcon
                            onClick={() => deleteDish(dish.name)}
                            style={{ cursor: "pointer" }}
                            sx={{ mt: 2 }}
                          />
                        </>
                      </tr>
                    ))}
                  </>
                ) : (
                  <tr>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="total-amount" style={{ textAlign: "center" }}>
            <hr />
            Total Amount to be paid: ₹{" "}
            {x.reduce((sum, dish) => sum + dish.price * dish.quantity, 0)}
          </div>
          <div
            style={{ padding: "1%", display: "flex", justifyContent: "center" }}
          >
            <Button
              onClick={clear}
              style={{
                color: "#941919",
                padding: "0.5rem",
                marginRight: "1rem",
              }}
            >
              <b>Clear</b>
            </Button>

            {x.length > 0 ? (
              <NavLink to="/checkout" variant="body2">
                <Button
                  type="submit"
                  variant="contained"
                  style={{
                    boxShadow: "rgba(28, 28, 28, 0.35) 0px 0.4rem 1rem",
                  }}
                  sx={{ mt: 1, mb: 1, bgcolor: "error.main" }}
                >
                  Checkout
                </Button>
              </NavLink>
            ) : (
              <Button
                type="submit"
                variant="contained"
                style={{ boxShadow: "rgba(28, 28, 28, 0.35) 0px 0.4rem 1rem" }}
                sx={{ mt: 1, mb: 1, bgcolor: "error.main" }}
              >
                Checkout
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
