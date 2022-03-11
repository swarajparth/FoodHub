import Footer from '../layout/Footer';
import image from '../../assets/Bg.jpg';
import Navbar from "../layout/Navbar";
import Body from "./Body";

const styles = {
  paperContainer: {
      backgroundImage: `url(${image})`,
      backgroundRepeat: "no-repeat",
      margin: 0,
      backgroundSize: 'cover',
      display: 'flex',
  flexDirection: 'column',
  }
};

function Home() {
  return (
  <>
    <Navbar/>
    <Body/>
    <Footer/>
  </>
  );
}

export default Home;