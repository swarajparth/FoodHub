import React, { useEffect, useState } from 'react'
import ErrorPage from '../ErrorPage/ErrorPage'
import { useNavigate } from 'react-router-dom';

const MyAccount = () => {

  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  const callAccountPage = async () =>{
    try{
      const res = await fetch('/account', {
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
      setUserData(data);
      
    }
    catch(err){
      console.log(err);
      navigate('/signin');
    }
  };
  
  useEffect(() => {
    callAccountPage();
  }, []) //array dependency - means executes only once as the page gets loaded

  

  return (
    <>
    <ErrorPage/>
    <p>Welcome to the account page.</p> 
    <p>Name: {userData.name}</p> 
    <p>User ID: {userData._id}</p> 
    <p>Email: {userData.email}</p> 
    <p>Contact Number: {userData.mobile}</p> 
    </>
  )
}

export default MyAccount