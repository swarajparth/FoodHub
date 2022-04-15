import Button from "@mui/material/Button";
import { NavLink, useNavigate } from "react-router-dom";
import "./app.css";

function Body() {
  return (
    <div>
      <section id="dashboard">
        <div className="row" style={{ justifyContent: "center" }}>
          <h1 id="dashboard-caption">
            We believe good food offers great smile
          </h1>
        </div>
        <div id="Order-now" style={{ justifyContent: "center" }}>
          <NavLink className="nav-link" to="/restaurants" variant="body2">
            <button className="btn btn-outline-light" type="button">
              Order Now!
            </button>
          </NavLink>
        </div>
      </section>
    </div>
  );
}

export default Body;
