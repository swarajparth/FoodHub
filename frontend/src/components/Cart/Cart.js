import React, { useEffect, useState } from 'react'
import ErrorPage from '../ErrorPage/ErrorPage'
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  const callCartPage = async () =>{
    try{
      const res = await fetch('/cart', {
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
        setUserData(data);
      }
    }
    catch(err){
      console.log(err);
      navigate('/signin');
    }
  };
  
  useEffect(() => {
    callCartPage();
  }, []) //array dependency - means executes only once as the page gets loaded

  return (
    <div>
    <ErrorPage/>
    <p>Welcome to the cart page.</p> 
    <p>Name: {userData.name}</p> 
    <p>User ID: {userData._id}</p> 
    <p>Email: {userData.email}</p> 
    <p>Contact Number: {userData.mobile}</p> 
    </div>
  )
}

export default Cart