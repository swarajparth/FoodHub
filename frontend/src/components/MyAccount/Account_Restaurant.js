import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Navbar from "../layout/Navbar";
import { UserContext } from "../../App";

const Account_Restaurant = () => {
  const navigate = useNavigate();

  const { refresh, setRefresh } = useContext(UserContext);

  const [values, setValues] = useState({
    name: "",
    address: "",
    email: "",
    mobile: "",
    _id: "",
  });

  const handleChangeValues = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, address, mobile, _id } = values;

    const regex_email =
      /^([a-z A-Z 0-9 \.-_]+)@([a-z A-Z 0-9 \.-_]+)\.([a-z]+)(\.[a-z]{2,5})?$/;
    //purpose of ? is it makes regex exp optional like whatever part u want

    const regex_mobile = /^[6-9][0-9]{9}$/;

    if (!regex_email.test(email)) {
      window.alert("Please enter a valid email");
      return;
    }

    if (!regex_mobile.test(mobile)) {
      window.alert(
        "Please enter a valid mobile number starting with digit >= 6"
      );
      return;
    }

    const res = await fetch("/api/update-account-restaurant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        address,
        mobile,
        _id,
      }),
    });

    const data = await res.json();
    if (!data) {
      window.alert("Technical error");
      console.log("Technical error");
    } else if (res.status === 422) {
      window.alert(data.error);
      console.log(data.error);
    } else {
      setRefresh(!refresh);
      console.log(data.message);
    }
  };

  const [dishValues, setDishValues] = useState({
    name: "",
    price: "",
    status: "",
    restaurant_email: "",
  });

  const handleChangeValues2 = (prop) => (event) => {
    setDishValues({ ...dishValues, [prop]: event.target.value });
  };

  const handleSubmit2 = async (event) => {
    event.preventDefault();

    const res = await fetch("/api/update-menu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dishValues),
    });

    const data = await res.json();
    if (!data) {
      window.alert("Technical error");
      console.log("Technical error");
    } else if (res.status === 422) {
      window.alert(data.error);
      console.log(data.error);
    } else {
      setRefresh(!refresh);
      console.log(data.message);
    }
  };

  const [restaurantData, setRestaurantData] = useState({});
  const [menus, setMenus] = useState([{}]);

  const callAccountRestaurantPage = async () => {
    try {
      const res = await fetch("/api/account-restaurant", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const { data, menu } = await res.json();

      setRestaurantData(data);
      setMenus(menu);

      setValues({
        name: data.name,
        address: data.address,
        email: data.email,
        mobile: data.mobile,
        _id: data._id,
      });

      setDishValues({
        ...dishValues,
        restaurant_email: data.email,
        status: "Available",
      });
    } catch (err) {
      console.log(err);
      navigate("/signin-restaurant");
    }
  };

  useEffect(() => {
    callAccountRestaurantPage();
  }, [refresh]);

  return (
    <>
      <Navbar />

      <div className="wrapper " style={{ margin: "3%", paddingInline: "3%" }}>
        <div className="content">
          <div className="row">
            <div className="col-md-5" style={{ paddingRight: "1%" }}>
              <div
                className="card card-user"
                style={{
                  boxShadow: "rgba(28, 28, 28, 0.35) 0px 0.4rem 1.8rem",
                }}
              >
                <div className="card-body" style={{ textAlign: "center" }}>
                  <div className="author">
                    <img
                      className="avatar border-gray"
                      style={{ width: "22rem" }}
                      src={require("../../assets/img/restaurant.jpeg")}
                      alt="..."
                    />
                    <h5
                      className="title"
                      style={{
                        color: "rgb(248, 77, 77)",
                        padding: "2%",
                        margin: "0",
                      }}
                    >
                      {restaurantData.name}
                    </h5>
                  </div>
                </div>
              </div>
              <div
                className="card"
                style={{
                  marginTop: "5%",
                  boxShadow: "rgba(28, 28, 28, 0.35) 0px 0.4rem 1.8rem",
                }}
              >
                <div className="card-header">
                  <h4 className="card-title" style={{ textAlign: "center" }}>
                    Update Menu
                  </h4>
                </div>
                <div className="card-body" style={{ padding: "0" }}>
                  <div
                    className="card-body"
                    style={{ paddingBottom: "0", paddingTop: "0" }}
                  >
                    <form>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label>Name</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Dish Name"
                              value={dishValues.name}
                              onChange={handleChangeValues2("name")}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-5 pr-1">
                          <div className="form-group">
                            <label>Price (₹)</label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Price"
                              value={dishValues.price}
                              onChange={handleChangeValues2("price")}
                            />
                          </div>
                        </div>
                        <div
                          className="col-md-5 pl-1"
                          style={{ marginLeft: "15%" }}
                        >
                          <div className="form-group">
                            <label>Status</label>
                            <select
                              name="status"
                              className="form-control"
                              value={dishValues.status}
                              onChange={handleChangeValues2("status")}
                            >
                              <option value="Available">Available</option>
                              <option value="Not Available">
                                Not Available
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="update ml-auto mr-auto">
                          <Button
                            type="submit"
                            variant="contained"
                            onClick={handleSubmit2}
                            sx={{ mt: 1, mb: 1, bgcolor: "error.main" }}
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-7">
              <div
                className="card card-user"
                style={{
                  boxShadow: "rgba(28, 28, 28, 0.35) 0px 0.4rem 1.8rem",
                }}
              >
                <div className="card-header">
                  <h5 className="card-title" style={{ textAlign: "center" }}>
                    Edit Profile
                  </h5>
                </div>
                <div className="card-body">
                  <form>
                    <div className="row">
                      <div className="col-md-5 pr-1">
                        <div className="form-group">
                          <label>Name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            defaultValue={restaurantData.name}
                            onChange={handleChangeValues("name")}
                          />
                        </div>
                      </div>
                      <div className="col-md-2 px-1">
                        <div className="form-group">
                          <label>Contact</label>
                          <input
                            type="Phone"
                            className="form-control"
                            placeholder="+91 *********"
                            defaultValue={restaurantData.mobile}
                            onChange={handleChangeValues("mobile")}
                          />
                        </div>
                      </div>
                      <div className="col-md-4 pl-1">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            defaultValue={restaurantData.email}
                            onChange={handleChangeValues("email")}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-11">
                        <div className="form-group">
                          <label>Address</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Address"
                            defaultValue={restaurantData.address}
                            onChange={handleChangeValues("address")}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="update ml-auto mr-auto">
                        <Button
                          type="submit"
                          variant="contained"
                          onClick={handleSubmit}
                          sx={{ mt: 1, mb: 1, bgcolor: "error.main" }}
                        >
                          Update Profile
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div
                className="card card-user"
                style={{
                  marginTop: "5%",
                  boxShadow: "rgba(28, 28, 28, 0.35) 0px 0.4rem 1.8rem",
                }}
              >
                <div className="card-header">
                  <h5 className="card-title" style={{ textAlign: "center" }}>
                    Menu
                  </h5>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table">
                      <thead className=" text-primary">
                        <tr style={{ color: "#941919" }}>
                          <th>Name</th>
                          <th>Price (₹)</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {menus.length === 0 && (
                          <tr>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                          </tr>
                        )}
                        {menus.length > 0 && (
                          <>
                            {menus.map((dish) => (
                              <tr>
                                <td>{dish.name}</td>
                                <td>{dish.price}</td>
                                <td>{dish.status}</td>
                              </tr>
                            ))}
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account_Restaurant;
