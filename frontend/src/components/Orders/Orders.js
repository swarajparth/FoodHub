import * as React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PreviousOrders from "./PreviousOrders";
import CurrentOrders from "./CurrentOrders";

const Orders = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = React.useState({});
  const [restaurantData, setRestaurantData] = React.useState({});

  const [loading, setLoading] = React.useState(true);
  const [ordersData, setOrdersData] = React.useState({});
  const [restaurantCurrentOrders, setRestaurantCurrentOrders] = React.useState(
    []
  );
  const [restaurantPreviousOrders, setRestaurantPreviousOrders] =
    React.useState([]);
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const callOrdersPage = async () => {
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
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
        setRestaurantData(data);
        sessionStorage.setItem("restaurantId", data._id);
      }
    } catch (err) {
      console.log(err);
      navigate("/signin-restaurant");
    }
  };

  const getRestaurantCurrentOrders = async () => {
    const restaurantId = sessionStorage.getItem("restaurantId");
    try {
      const res = await fetch("/api/restaurant-current-orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ restaurantId }),
      });
      const data = await res.json();

      if (!(res.status === 200)) {
        throw new Error(res.err);
      }
      console.log(data);
      setRestaurantCurrentOrders(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getRestaurantPreviousOrders = async () => {
    const restaurantId = sessionStorage.getItem("restaurantId");
    try {
      const res = await fetch("/api/restaurant-previous-orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ restaurantId }),
      });
      const data = await res.json();

      if (!(res.status === 200)) {
        throw new Error(res.err);
      }
      setRestaurantPreviousOrders(data);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    callOrdersPage().then(async () => {
      getRestaurantCurrentOrders();
      getRestaurantPreviousOrders();
      setLoading(false);
    });
  }, []); //array dependency - means executes only once as the page gets loaded

  return (
    <>
      <Navbar />

      <div
        className="card-orders"
        style={{
          margin: "3% 10%",
          boxShadow: "rgba(28, 28, 28, 0.35) 0px 0.4rem 1.8rem",
        }}
      >
        {!activeStep ? (
          <>
            <div
              className="update ml-auto mr-auto"
              style={{ display: "flex", justifyContent: "right" }}
            >
              <Button
                type="submit"
                onClick={handleNext}
                sx={{ mt: 1, mb: 1, mr: 5, color: "error.main" }}
              >
                <ArrowForwardIosIcon />
              </Button>
            </div>
            <CurrentOrders restaurantCurrentOrders={restaurantCurrentOrders} />
          </>
        ) : (
          <>
            <div
              className="update ml-auto mr-auto"
              style={{ display: "flex", justifyContent: "left" }}
            >
              <Button
                type="submit"
                onClick={handleBack}
                sx={{ mt: 1, mb: 1, mr: 5, color: "error.main" }}
              >
                <ArrowBackIosNewIcon />
              </Button>
            </div>
            <PreviousOrders
              restaurantPreviousOrders={restaurantPreviousOrders}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Orders;
