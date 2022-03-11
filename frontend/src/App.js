import logo from './logo.svg';
import './App.css';
import {Route, Routes } from "react-router-dom"
import Home from './components/Home/Home';
import MyAccount from './components/MyAccount/MyAccount';
import Menu from './components/Menu/Menu';
import Cart from './components/Cart/Cart';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register'
import About from './components/About/About'
import SignIn_Restaurant from './components/SignIn_Restaurant/SignIn_Restaurant';
import Register_Restaurant from './components/Register_Restaurant/Register_Restaurant';
import ErrorPage from './components/ErrorPage/ErrorPage';

function App() {
  return (
    
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/account' element={<MyAccount/>} />
      <Route path='/menu' element={<Menu/>} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/signin' element={<SignIn/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/register-restaurant' element={<Register_Restaurant/>} />
      <Route path='/signin-restaurant' element={<SignIn_Restaurant/>} />
      <Route path='*' element={<ErrorPage/>} />
    </Routes>
  );
}
export default App;