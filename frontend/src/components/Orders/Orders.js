import * as React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PreviousOrders from "./PreviousOrders";
import CurrentOrders from "./CurrentOrders";

const Orders = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = React.useState({});
  const [restaurantData, setRestaurantData] = React.useState({});
  //   const [x, setX] = React.useState([]);
  //   const {refresh, setRefresh} = React.useContext(UserContext);

  //   const clear = () => {
  //     setX([]);
  //     sessionStorage.setItem('cartDishes', JSON.stringify([]));
  //     setRefresh(!refresh);
  //   }

  //   const deleteDish = (dishName) => {
  //     for (let index = 0; index < x.length; index++) {
  //       const item = x[index];

  //       if(item.name === dishName){
  //         x.splice(index, 1);
  //         sessionStorage.setItem('cartDishes', JSON.stringify(x));
  //         setRefresh(!refresh);
  //         setX(x);
  //         return;
  //       }
  //     }
  //   }

  //   const fetchRestaurantDetails = async (items) =>{
  //     try{
  //       const res = await fetch('/restaurantDetails', {
  //         method: "POST",
  //         headers:{
  //           "Content-Type": "application/json"
  //         },
  //         body: JSON.stringify({id: items[0].restaurant_id})
  //       });
  //       const data = await res.json();

  //       setRestaurantData(data);

  //     }
  //     catch(err){
  //       console.log(err);
  //     }
  //   };

  //   const getUserData = async () =>{
  //     try{
  //       const res = await fetch('/get-user-data', {
  //         method: "GET",
  //         headers:{
  //           Accept: "application/json",
  //           "Content-Type": "application/json"
  //         },
  //         credentials: "include"
  //       });
  //       const data = await res.json();

  //       if(!(res.status === 200)){
  //         throw new Error(res.err);
  //       }
  //       else{
  //         setUserData(data);
  //       }
  //     }
  //     catch(err){
  //       console.log(err);
  //       navigate('/signin');
  //     }
  //   };

  const [loading, setLoading] = React.useState(true);
  const [ordersData, setOrdersData] = React.useState({});
  const [restaurantCurrentOrders, setRestaurantCurrentOrders] = React.useState([]);
  const [restaurantPreviousOrders, setRestaurantPreviousOrders] =React.useState([]);
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const callOrdersPage = async () => {
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();

      if (!(res.status === 200)) {
        throw new Error(res.err);
      } else {
        setRestaurantData(data);
        sessionStorage.setItem("restaurantId", data._id);
      }
    } catch (err) {
      console.log(err);
      navigate("/signin-restaurant");
    }
  };

  const getRestaurantCurrentOrders = async () => {
    const restaurantId = sessionStorage.getItem("restaurantId");
    try {
      const res = await fetch("/api/restaurant-current-orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ restaurantId }),
      });
      const data = await res.json();

      if (!(res.status === 200)) {
        throw new Error(res.err);
      }
      console.log(data);
      setRestaurantCurrentOrders(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getRestaurantPreviousOrders = async () => {
    const restaurantId = sessionStorage.getItem("restaurantId");
    try {
      const res = await fetch("/api/restaurant-previous-orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ restaurantId }),
      });
      const data = await res.json();

      if (!(res.status === 200)) {
        throw new Error(res.err);
      }
      setRestaurantPreviousOrders(data);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    callOrdersPage().then(async () => {
      getRestaurantCurrentOrders();
      getRestaurantPreviousOrders();
      setLoading(false);
    });

  // callOrdersPage();
  // const items = sessionStorage.getItem('cartDishes');
  // if (items.length > 0) {
  //   const itemsJson = JSON.parse(items);

  //   if (itemsJson.length > 0) fetchRestaurantDetails(itemsJson);
  //   setX(itemsJson);
  // }
  // getUserData();

  }, []); //array dependency - means executes only once as the page gets loaded

  return (
    // <div>
    // <p>Welcome to the Orders page of your restaurant.</p>
    // <p>Name: {ordersData.name}</p>
    // <p>User ID: {ordersData._id}</p>
    // <p>Email: {ordersData.email}</p>
    // <p>Contact Number: {ordersData.mobile}</p>
    // </div>






    <>
      <Navbar />

      <div
        className="card-orders"
        style={{
          margin: "3% 10%",
          boxShadow: "rgba(28, 28, 28, 0.35) 0px 0.4rem 1.8rem",
        }}
      >
        {!activeStep ? (
          <>
            <div
              className="update ml-auto mr-auto"
              style={{ display: "flex", justifyContent: "right" }}
            >
              <Button
                type="submit"
                onClick={handleNext}
                sx={{ mt: 1, mb: 1, mr: 5, color: "error.main" }}
              >
                <ArrowForwardIosIcon />
              </Button>
            </div>
            <CurrentOrders restaurantCurrentOrders = {restaurantCurrentOrders}/>
          </>
        ) : (
          <>
            <div
              className="update ml-auto mr-auto"
              style={{ display: "flex", justifyContent: "left" }}
            >
              <Button
                type="submit"
                onClick={handleBack}
                sx={{ mt: 1, mb: 1, mr: 5, color: "error.main" }}
              >
                <ArrowBackIosNewIcon />
              </Button>
            </div>
            <PreviousOrders restaurantPreviousOrders = {restaurantPreviousOrders}/>
          </>
        )}











        {/* 
    <CurrentOrders/>;
      case 1:
        return <PreviousOrders/>; */}

        {/* {x.length > 0?
    //         <>
    //           {x.map(dish => (
    //             <tr>
    //               <td>{dish.name}</td>
    //               <td>{restaurantData.name}</td>
    //               <td>{dish.quantity}</td>
    //               <td>{dish.price}</td>
    //               <td>{dish.amount}</td>
    //               <><DeleteIcon onClick={() => deleteDish(dish.name)} style={{cursor: 'pointer'}} sx={{ mt: 2 }}/></>
    //             </tr>)
    //           )}
    //         </>
    //         :
    //         <tr>
    //         <td>-</td>
    //         <td>-</td>
    //         <td>-</td>
    //         <td>-</td>
    //         <td>-</td>
    //       </tr>
    {/* <div className='total-amount' style={ {textAlign:'center'}}>
    //     <hr/>
    //     Total Amount to be paid: ₹ {x.reduce((sum, dish) => sum + (dish.price * dish.quantity), 0)}
    //   </div>
    //   <div style={{ padding:'1%', display:'flex', justifyContent:'center'}}>
    //   <Button onClick={clear} style={{color: '#941919',padding:'0.5rem', marginRight:'1rem'}}>
    //     <b>Clear</b>
    //   </Button>

    //   {x.length > 0?
          
    //     <NavLink to="/checkout" variant="body2" >
    //       <Button
    //         type="submit"
    //         variant="contained"
    //         style={{boxShadow: 'rgba(28, 28, 28, 0.35) 0px 0.4rem 1rem'}}
    //         sx={{ mt: 1, mb: 1, bgcolor: "error.main" }}
    //       >
    //         Checkout
    //       </Button>
    //     </NavLink>

    //     :

    //     <Button
    //       type="submit"
    //       variant="contained"
    //       style={{boxShadow: 'rgba(28, 28, 28, 0.35) 0px 0.4rem 1rem'}}
    //       sx={{ mt: 1, mb: 1, bgcolor: "error.main" }}
    //     >
    //       Checkout
    //     </Button>
    //   }

    // </div> */}

        {/* <Navbar/>

     {restaurants.length === 0 &&
         <h2 style={{textAlign: 'center', marginTop: '5%'}}>No restaurant to show</h2>
     }
  
     {restaurants.length > 0 &&
         <div style={{display: 'flex', flexWrap: 'wrap', paddingInline: '3%'}}>
             {restaurants.map(restaurants =>(
               <Restaurant_Card restaurants={restaurants}/>
             ))}
         </div>
     } */}
      </div>
    </>
  );
};

export default Orders;
