import { useEffect, useContext } from "react";
import Footer from "../layout/Footer";
import image from "../../assets/Bg.jpg";
import Navbar from "../layout/Navbar";
import { UserContext } from "../../App";
import Body from "./Body";
import Body_Restaurant from "./Body_Restaurant";
import { useNavigate } from "react-router-dom";

const styles = {
  paperContainer: {
    backgroundImage: `url(${image})`,
    backgroundRepeat: "no-repeat",
    margin: 0,
    backgroundSize: "cover",
    display: "flex",
    flexDirection: "column",
  },
};

function Home() {
  const { state2, dispatch2 } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      {state2 ? <Body_Restaurant /> : <Body />}
      <Footer />
    </>
  );
}

export default Home;
