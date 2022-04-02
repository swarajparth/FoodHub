import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, ButtonGroup } from "@mui/material";
import { UserContext } from "../../App";

const Menu_Card = ({ menu, id }) => {
  const navigate = useNavigate();

  const { state, dispatch } = React.useContext(UserContext);
  const { refresh, setRefresh } = React.useContext(UserContext);

  const [count, setCount] = React.useState(0);

  useEffect(() => {
    let x = [];
    let y = sessionStorage.getItem("cartDishes");

    if (y) {
      x = JSON.parse(y);
    }
    if (x.length !== 0) {
      for (const dish of x) {
        if (dish.name === menu.name) {
          setCount(dish.quantity);
        }
      }
    }
  }, []);

  const countIncrement = () => {
    setCount(count < 20 ? count + 1 : count);
  };

  const countDecrement = () => {
    setCount(count > 0 ? count - 1 : count);
  };

  const handleSubmit = async (event) => {
    if (count === 0) {
    } else {
      let x = [];
      let y = sessionStorage.getItem("cartDishes");

      if (y) {
        x = JSON.parse(y);
      }

      let item = {
        name: menu.name,
        restaurant_id: id,
        quantity: count,
        price: menu.price,
        amount: menu.price * count,
      };

      if (x.length === 0) {
        sessionStorage.setItem("cartDishes", JSON.stringify([item]));
        setRefresh(!refresh);
      } else {
        if (x[0].restaurant_id === id) {
          for (let index = 0; index < x.length; index++) {
            const dish = x[index];

            if (dish.name === menu.name) {
              dish.quantity = count;
              dish.amount = count * menu.price;

              sessionStorage.setItem("cartDishes", JSON.stringify(x));
              setRefresh(!refresh);
              return;
            }
          }

          sessionStorage.setItem("cartDishes", JSON.stringify([...x, item]));
          setRefresh(!refresh);
        } else {
          window.alert("Cart has orders from different restaurant");
        }
      }
    }
  };

  return (
    <>
      <div className="col service-card" style={{ flexGrow: "0" }}>
        <div
          id="canteen-card"
          className="card "
          style={{
            width: "20rem",
            boxShadow: "rgba(28, 28, 28, 0.2) 0px 0.4rem 1.8rem",
          }}
        >
          <img
            src={require("../../assets/img/best-food.jpg")}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body" style={{ marginLeft: "2%" }}>
            <div className="row">
              <div className="col-md-6" style={{ paddingRight: "1%" }}>
                <h5 className="card-title" style={{ color: "black" }}>
                  <b>{menu.name}</b>
                </h5>
                <ButtonGroup
                  color="error"
                  aria-label="outlined primary button group"
                >
                  <Button
                    style={{
                      paddingLeft: "0",
                      paddingRight: "0",
                      minWidth: "30px",
                    }}
                    onClick={countDecrement}
                  >
                    -
                  </Button>
                  <Button>{count}</Button>
                  <Button
                    style={{
                      paddingLeft: "0",
                      paddingRight: "0",
                      minWidth: "30px",
                    }}
                    onClick={countIncrement}
                  >
                    +
                  </Button>
                </ButtonGroup>
              </div>
              <div className="col-md-6" style={{ paddingRight: "1%" }}>
                <h6
                  className="card-title"
                  style={{
                    color: "black",
                    paddingInline: "30%",
                    paddingRight: "0",
                    marginLeft: "5%",
                  }}
                >
                  <b>₹{menu.price}</b>
                </h6>
                <div
                  style={{
                    paddingInline: "15%",
                    paddingRight: "0",
                    marginLeft: "5%",
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{
                      borderRadius: 5,
                      mt: 1,
                      mb: 1,
                      bgcolor: "error.main",
                      textTransform: "capitalize",
                    }}
                  >
                    Add ₹{menu.price * count}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu_Card;
