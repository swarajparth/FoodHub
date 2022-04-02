import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Menu_Card from "./Menu_Card";

const Menu = () => {
  const { id } = useParams();

  const [menu, setMenu] = useState({});

  const callMenuPage = async () => {
    try {
      const res = await fetch(`/api/menu/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (!(res.status === 200)) {
        throw new Error(res.err);
      } else {
        setMenu(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    callMenuPage();
  }, []); //array dependency - means executes only once as the page gets loaded

  return (
    <>
      <Navbar />

      {menu.length === 0 && (
        <h2 style={{ textAlign: "center", marginTop: "5%" }}>
          Restaurant is currently unavailable
        </h2>
      )}

      {menu.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", paddingInline: "3%" }}>
          {menu.map((menu) => (
            <Menu_Card menu={menu} id={id} />
          ))}
        </div>
      )}
    </>
  );
};

export default Menu;
