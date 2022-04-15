import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Box } from "@mui/material";

const Restaurant_Card = ({ restaurants }) => {
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
            src={require("../Home/img/canteen-final-.jpg")}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <NavLink
              to={`/restaurantprofile/${restaurants._id}`}
              variant="body2"
            >
              <h5
                className="card-title"
                style={{ textAlign: "center", color: "black" }}
              >
                <b>{restaurants.name}</b>
              </h5>
            </NavLink>

            <Box textAlign="center">
              <NavLink to={`/menu/${restaurants._id}`} variant="body2">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    borderRadius: 5,
                    mt: 2,
                    mb: 1,
                    bgcolor: "error.main",
                    textTransform: "capitalize",
                  }}
                >
                  View Dishes
                </Button>
              </NavLink>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default Restaurant_Card;
