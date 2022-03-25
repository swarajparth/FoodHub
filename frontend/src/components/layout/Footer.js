import React from "react";
import { NavLink } from "react-router-dom";
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
  return (
    <footer className="footer green darken-4" style={{ backgroundColor: '#4e4949', margin:'0', padding: '1%'}}>
      <div style={{display: "flex", textAlign:'center', justifyContent: 'center', alignItems: 'center'}}>
      <img className="foodhub_logo" style={{ marginRight: '20%', width:'15%'}} src={require("../../assets/foodhub_logo.jpg")} alt="..." />
      <span className='text-white' style={{ paddingTop: '1%', paddingBottom: '2%', width: '15%', color: 'white'}}>
        Copyright &copy; &nbsp;
        <NavLink style={{ color: "inherit" }} to="/">
          FoodHub
        </NavLink>{" "}{new Date().getFullYear()}
      </span>
      
      <GitHubIcon onClick={() => window.open("https://github.com/swarajparth/FoodHub", "_blank")}
      style={{ cursor: 'pointer', marginLeft: '20%', width:'15%', stroke: "black", strokeWidth: "2", transform: "scale(2)"}}
      />
      </div>
    </footer>
  );
};

export default Footer;