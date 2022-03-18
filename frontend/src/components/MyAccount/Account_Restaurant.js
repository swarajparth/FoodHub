import React, { useEffect, useState } from 'react'
import ErrorPage from '../ErrorPage/ErrorPage'
import { useNavigate } from 'react-router-dom';

const Account_Restaurant = () => {

  const navigate = useNavigate();
  const [restaurantData, setRestaurantData] = useState({});

  const callAccountRestaurantPage = async () =>{
    try{
      const res = await fetch('/account-restaurant', {
        method: "GET",
        headers:{
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
      const data = await res.json();
      
      if(!(res.status === 200)){
        throw new Error(res.err);
      }
      setRestaurantData(data);
      
    }
    catch(err){
      console.log(err);
      navigate('/signin-restaurant');
    }
  };
  
  useEffect(() => {
    callAccountRestaurantPage();
  }, []) //array dependency - means executes only once as the page gets loaded

  

  return (
    <>
    <ErrorPage/>
    <p>Welcome to the account page for restaurant.</p> 
    <p>Name: {restaurantData.name}</p> 
    <p>User ID: {restaurantData._id}</p> 
    <p>Email: {restaurantData.email}</p> 
    <p>Contact Number: {restaurantData.mobile}</p> 
    </>
  )
}

export default Account_Restaurant