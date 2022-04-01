import Button from "@mui/material/Button";
import { NavLink, useNavigate} from "react-router-dom";
import './app.css'


function Body_Restaurant() {

    return (
        <div>
  
        <section id="dashboard">
        <div className="row" style={{justifyContent: 'center'}}>
          <h1 id="dashboard-caption">We believe good food offers great smile</h1>
        </div>
        {/* <div id="Order-now" style={{justifyContent: 'center'}}>
          <NavLink className="nav-link" to="/restaurants" variant="body2">
          <button className="btn btn-outline-light" type="button">Order Now!</button>
          </NavLink>
        </div> */}
      </section>
      {/* <section id="about-us">
        <div className="container">
          <div className="row ">
            <div id="chef-img justify-content-center" className="col-6">
              <img src={require("./img/stuff-img-02.jpg")} alt="" />
            </div>
            <div id="abt-container" className="col-6">
              <h1>About Us</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi corrupti magni mollitia dolorum
                saepe voluptatum quae ab, magnam alias quaerat totam cupiditate sint facere ad officia ipsam
                sunt
                nihil deleniti?Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt minima omnis
                quasi
                eligendi. Molestiae perspiciatis, debitis exercitationem minima asperiores nulla eos placeat ea
                laborum. Ducimus vel consectetur iure sunt laudantium.
              </p>
            </div>
          </div>
        </div></section>
      <section id="services">
        <div className="container">
          <div className="row">
            <div className="col">
              <div id="our-services">
                <h1>Our Services</h1>
              </div>
              <div className="col service-card" style={{display: 'flex'}}>
                <div id="canteen-card" className="card " style={{width: '18rem'}}>
                  <img src={require("./img/canteen-final-.jpg")} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">CANTEEN</h5>
                    <p className="card-text">IIITG canteen provide delicious food!</p>
                    <a href="#" className="btn btn-primary">Order from here!</a>
                  </div>
                </div>
                <div id="nescafe-card" className="card" style={{width: '18rem'}}>
                  <img src={require("./img/nescafe.jpg")} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">NESCAFÉ</h5>
                    <p className="card-text">Nescafé provides the best COFFEE!</p>
                    <a href="#" className="btn btn-primary">Order from here!</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="spl-dishes">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="spl-dishes align-items-center">
                <h1>Our Special Dishes</h1>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      </div>

    );
  }
  
  export default Body_Restaurant;