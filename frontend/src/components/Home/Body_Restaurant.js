import Button from "@mui/material/Button";
import { NavLink, useNavigate } from "react-router-dom";
import "./app.css";

function Body_Restaurant() {
  return (
    <div>
      <section id="dashboard">
        <div className="row" style={{ justifyContent: "center" }}>
          <h1 id="dashboard-caption">
            We believe good food offers great smile
          </h1>
        </div>
      </section>
    </div>
  );
}

export default Body_Restaurant;
