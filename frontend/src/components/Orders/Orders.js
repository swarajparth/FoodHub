import React, { useEffect, useState } from 'react'
import ErrorPage from '../ErrorPage/ErrorPage'
import { useNavigate } from 'react-router-dom';

const Orders = () => {

  const navigate = useNavigate();
  const [restaurantData, setRestaurantData] = useState({});

  const callOrdersPage = async () =>{
    try{
      const res = await fetch('/orders', {
        method: "GET",
        headers:{
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
      const data = await res.json();
      console.log(data);
      
      if(!(res.status === 200)){
        throw new Error(res.err);
      }
      else{
        setRestaurantData(data);
      }
    }
    catch(err){
      console.log(err);
      navigate('/signin-restaurant');
    }
  };
  
  useEffect(() => {
    callOrdersPage();
  }, []) //array dependency - means executes only once as the page gets loaded

  return (
    <div>
    <ErrorPage/>
    <p>Welcome to the Orders page of your restaurant.</p> 
    <p>Name: {restaurantData.name}</p> 
    <p>User ID: {restaurantData._id}</p> 
    <p>Email: {restaurantData.email}</p> 
    <p>Contact Number: {restaurantData.mobile}</p> 
    </div>
  )
}

export default Orders