import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";
import "./app.css";

function About() {
  return (
    <>
      <Navbar />

      <div id="abt-us" style={{ marginBottom: "10%" }}>
        <div className="container" style={{ marginTop: "2%" }}>
          <h1
            style={{
              display: "flex",
              paddingLeft: "10%",
              justifyContent: "flex-start",
            }}
          >
            About
          </h1>
          <div className="row " style={{ marginTop: "2%" }}>
            <div
              id="chef-img "
              className=" col-lg-6 col-md-4 col-sm"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={require("./img/stuff-img-02.jpg")} />
            </div>
            <div
              id="abt-container"
              className="col-lg-6 col-md-16"
              style={{ paddingTop: "1%" }}
            >
              <p
                style={{
                  paddingTop: "0",
                  fontSize: "20px",
                  fontWeight: "bold",
                  fontStyle: "oblique",
                  letterSpacing: "2px",
                  wordSpacing: "5px",
                  textAlign: "justify",
                }}
              >
                There's nothing cookie-cutter about FoodHub. Neither our food
                nor our people. Around here, we don't settle for anything less
                than food we're proud to serve. At FoodHub, we don't just
                deliver food. We deliver delicious, mouth-watering and healthy
                food with an intent of serving better.
                <br />
                <br />
                FoodHub is the creation of four engineering graduates from one
                of the most prestigious engineering institutes in India. Our
                motto is to be the best in the domain with our outstanding
                service and love from our customers.
                <br />
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default About;
