import * as React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import { UserContext } from '../../App';


const Orders = () => {
  
  const navigate = useNavigate();
  const [ordersData, setOrdersData] = React.useState({});
  const [userData, setUserData] = React.useState({});
  const [restaurantData, setRestaurantData] = React.useState({});
  const [x, setX] = React.useState([]);
  const {refresh, setRefresh} = React.useContext(UserContext);

  
  const clear = () => {
    setX([]);
    sessionStorage.setItem('cartDishes', JSON.stringify([]));
    setRefresh(!refresh);    
  }
  
  const deleteDish = (dishName) => {
    for (let index = 0; index < x.length; index++) {
      const item = x[index];
      
      if(item.name === dishName){
        x.splice(index, 1);
        sessionStorage.setItem('cartDishes', JSON.stringify(x));
        setRefresh(!refresh);
        setX(x);
        return;
      }
    }
  }

  const fetchRestaurantDetails = async (items) =>{
    try{
      const res = await fetch('/restaurantDetails', {
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({id: items[0].restaurant_id})
      });
      const data = await res.json();
      
      setRestaurantData(data);

    }
    catch(err){
      console.log(err);
    }
  };

  const getUserData = async () =>{
    try{
      const res = await fetch('/get-user-data', {
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
      else{
        setUserData(data);
      }
    }
    catch(err){
      console.log(err);
      navigate('/signin');
    }
  };
  


  const callOrdersPage = async () =>{
    try{
      const res = await fetch('/orders', {
        method: "POST",
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
        setOrdersData(data);
      }
    }
    catch(err){
      console.log(err);
      navigate('/signin-restaurant');
    }
  };
  
  React.useEffect(() => {
    // callOrdersPage();
    // const items = sessionStorage.getItem('cartDishes');
    // if (items.length > 0) {
    //   const itemsJson = JSON.parse(items);
      
    //   if (itemsJson.length > 0) fetchRestaurantDetails(itemsJson);
    //   setX(itemsJson);
    // }
    // getUserData();
  }, []) //array dependency - means executes only once as the page gets loaded

  return (
    // <div>
    // <p>Welcome to the Orders page of your restaurant.</p> 
    // <p>Name: {ordersData.name}</p> 
    // <p>User ID: {ordersData._id}</p> 
    // <p>Email: {ordersData.email}</p> 
    // <p>Contact Number: {ordersData.mobile}</p> 
    // </div>

    <div>
    <Navbar/>

    <div className='card-orders' style={{margin:'3%', boxShadow: 'rgba(28, 28, 28, 0.35) 0px 0.4rem 1.8rem'}}>
      <h1><b>Orders</b><hr/></h1>
      <div className='Items' style={{margin:'2%'}}>
        <table className="table">
          <thead className=" text-primary">
            <tr  style={{color: '#941919'}}>
            <th>
                  Date
              </th>
              <th>
                  Name
              </th>
              <th>
                  Customer
              </th>
              <th>
                  Quantity
              </th>
              <th>
                  Amount
              </th>
              <th>
                  Delivery Address
              </th>
              <th>
                  Payment Method
              </th>
            </tr>
          </thead>
          <tbody>

                <tr>
                  <td> - </td>
                  <td> - </td>
                  <td> - </td>
                  <td> - </td>
                  <td> - </td>
                  <td> - </td>
                  <td> - </td>
                </tr>



          {/* {x.length > 0?
            <>
              {x.map(dish => (
                <tr>
                  <td>{dish.name}</td>
                  <td>{restaurantData.name}</td>
                  <td>{dish.quantity}</td>
                  <td>{dish.price}</td>
                  <td>{dish.amount}</td>
                  <><DeleteIcon onClick={() => deleteDish(dish.name)} style={{cursor: 'pointer'}} sx={{ mt: 2 }}/></>
                </tr>)
              )}
            </>
            :
            <tr>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
          } */}
          </tbody>
        </table>
      </div>
      {/* <div className='total-amount' style={ {textAlign:'center'}}>
        <hr/>
        Total Amount to be paid: ₹ {x.reduce((sum, dish) => sum + (dish.price * dish.quantity), 0)}
      </div>
      <div style={{ padding:'1%', display:'flex', justifyContent:'center'}}>
      <Button onClick={clear} style={{color: '#941919',padding:'0.5rem', marginRight:'1rem'}}>
        <b>Clear</b>
      </Button>

      {x.length > 0?
          
        <NavLink to="/checkout" variant="body2" >
          <Button
            type="submit"
            variant="contained"
            style={{boxShadow: 'rgba(28, 28, 28, 0.35) 0px 0.4rem 1rem'}}
            sx={{ mt: 1, mb: 1, bgcolor: "error.main" }}
          >
            Checkout
          </Button>
        </NavLink>

        :

        <Button
          type="submit"
          variant="contained"
          style={{boxShadow: 'rgba(28, 28, 28, 0.35) 0px 0.4rem 1rem'}}
          sx={{ mt: 1, mb: 1, bgcolor: "error.main" }}
        >
          Checkout
        </Button>
      }

    </div> */}
    </div>
    

    
    </div>
  )
}

export default Orders