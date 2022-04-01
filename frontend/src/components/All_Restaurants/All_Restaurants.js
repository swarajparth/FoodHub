import React, { useEffect, useState } from "react";
import Navbar from "../layout/Navbar";
import Restaurant_Card from "./Restaurant_Card";

const All_Restaurants = () => {
  const [restaurants, setRestaurants] = useState([{}]);

  const callAll_RestaurantsPage = async () => {
    try {
      const res = await fetch("/api/restaurants", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.status === 401) {
        throw new Error(res.err);
      } else {
        setRestaurants(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    callAll_RestaurantsPage();
  }, []); //array dependency - means executes only once as the page gets loaded

  return (
    <>
      <Navbar />

      {restaurants.length === 0 && (
        <h2 style={{ textAlign: "center", marginTop: "5%" }}>
          No restaurant to show
        </h2>
      )}

      {restaurants.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", paddingInline: "3%" }}>
          {restaurants.map((restaurants) => (
            <Restaurant_Card restaurants={restaurants} />
          ))}
        </div>
      )}
    </>
  );
};

export default All_Restaurants;
