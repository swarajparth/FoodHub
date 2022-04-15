// importing require webpages
import logo from './logo.svg';
import './App.css';
import { useState, createContext, useEffect, useMemo } from "react";
import {Route, Routes, BrowserRouter as Router } from "react-router-dom"
import Home from './components/Home/Home';
import MyAccount from './components/MyAccount/MyAccount';
import Menu from './components/Menu/Menu';
import Cart from './components/Cart/Cart';
import SignIn from './components/SignIn/SignIn';
import SignOut from './components/SignOut/SignOut';
import Register from './components/Register/Register'
import About from './components/About/About'
import SignIn_Restaurant from './components/SignIn_Restaurant/SignIn_Restaurant';
import Register_Restaurant from './components/Register_Restaurant/Register_Restaurant';
import ErrorPage from './components/ErrorPage/ErrorPage';
import SignOut_Restaurant from './components/SignOut_Restaurant/SignOut_Restaurant';
import Account_Restaurant from './components/MyAccount/Account_Restaurant';
import Orders from './components/Orders/Orders';
import All_Restaurants from './components/All_Restaurants/All_Restaurants';
import RestaurantProfile from './components/MyAccount/RestaurantProfile'
import Checkout from './components/Checkout/Checkout';
import Forgot_Password from './components/Forgot_Password/Forgot_Password';
import Forgot_Password_Restaurant from './components/Forgot_Password/Forgot_Password_Restaurant';


//context API
export const UserContext = createContext();

const App = () => {
  
  const [state, dispatch] = useState(false);
  const [state2, dispatch2] = useState(false);
  const [refresh, setRefresh] = useState(true);

  const providerValue = useMemo(() => ({
    state, dispatch,
    state2, dispatch2,
    refresh, setRefresh
  }), [state, state2, refresh]);

  useEffect(() => {
    if (sessionStorage.getItem('isLoggedIn')) {
        dispatch(true);
    }
    else if(sessionStorage.getItem('isRestaurantLoggedIn')){
        dispatch2(true);
    }
    
  }, []);

  return (
    <>
      <UserContext.Provider value={providerValue}>
      <Router>
      <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/account' element={<MyAccount/>} />
          <Route path='/account-restaurant' element={<Account_Restaurant/>} />
          <Route path='/orders' element={<Orders/>} />
          <Route path='/menu/:id' element={<Menu/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/signin' element={<SignIn/>} />
          <Route path='/signout' element={<SignOut/>} />
          <Route path='/signout-restaurant' element={<SignOut_Restaurant/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/register-restaurant' element={<Register_Restaurant/>} />
          <Route path='/signin-restaurant' element={<SignIn_Restaurant/>} />
          <Route path='/restaurants' element={<All_Restaurants/>} />
          <Route path='/restaurantprofile/:id' element={<RestaurantProfile/>} />
          <Route path='/checkout' element={<Checkout/>} />
          <Route path='/forgot-password' element={<Forgot_Password/>} />
          <Route path='/forgot-password-restaurant' element={<Forgot_Password_Restaurant/>} />
          <Route path='*' element={<ErrorPage/>} />
      </Routes>
      </Router>
      </UserContext.Provider>
    </>
  );
}
export default App;
