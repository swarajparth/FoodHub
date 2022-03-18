import Navbar from '../layout/Navbar';
import './app.css'


function About() {

    return (
        <>
        {/* <header2>
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="hero-header">
                <a id="i-logo" href="/">FoodHub</a>
              </div>
              <div id="hero-list-content" className="hero-list">
                <ul className="ul2">
                  <li className="li2">
                    <a id="Home" href="/">HOME</a>
                  </li>
                  <li className="li2">
                    <a id="AboutUs" href="#about-us">ABOUT US</a>
                  </li>
                  <li className="li2">
                    <a id="Services" href="#services">SERVICES</a>
                  </li>
                  <li className="li2">
                    <a id="Contact" href="#">CONTACT</a>
                  </li>
                </ul>
              </div>
              <div id="hero-search">
                <form className="form-inline my-2 my-lg-0">
                  <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                  <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
                </form>
              </div>
              <div id="hero-cart">
                <a href="/cart"><i className="bi bi-cart" style={{fontSize: '2rem'}} /></a>
              </div>
              <div id="signin">
                <button className="btn btn-outline-light"><a href="/signin">Sign In</a></button>
              </div>
            </div>
          </div>
        </header2> */}
        <Navbar/>
        <section id="dashboard">
          <div className="row">
            <h1 id="dashboard-caption">We believe good food offer great smile</h1>
          </div>
          <div id="Order-now">
            <button className="btn btn-outline-light" type="button">Order Now!</button>
          </div>
        </section>
        <section id="about-us">
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
        </section>
        {/* <footer2>
          <div className="container-fluid">
            <div className="row ">
              <div className="col-3">
                <div className="footer-logo">
                  <a id="f-logo" href="#">FoodHub</a>
                </div>
              </div>
              <div className="f-navigation">
                <h4>Navigation</h4>
                <h6><a href="#">Home</a></h6>
                <h6><a href="#">Contact</a></h6>
              </div>
            </div>
          </div>
        </footer2> */}
      </>

    );
  }

export default About;