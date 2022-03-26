import React, { useEffect, useState } from "react";
import Navbar from "../layout/Navbar";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const MyAccount = () => {
  const navigate = useNavigate();

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

    const res = await fetch("/update-account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await res.json();
    if (!data) {
      window.alert("Technical error");
      console.log("Technical error");
    } else if (res.status === 422) {
      window.alert(data.error);
      console.log(data.error);
    } else {
      window.alert(data.message);
      console.log(data.message);
    }
  };

  const [userData, setUserData] = useState({});
  const [userCurrentOrders, setUserCurrentOrders] = useState([]);
  const [userPreviousOrders, setUserPreviousOrders] = useState([]);

  const callAccountPage = async () => {
    try {
      const res = await fetch("/account", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();

      if (!(res.status === 200)) {
        throw new Error(res.err);
      }
      setUserData(data);

      setValues({
        name: data.name,
        address: data.address,
        email: data.email,
        mobile: data.mobile,
        _id: data._id,
      });
    } catch (err) {
      console.log(err);
      navigate("/signin");
    }
  };

  const getUserCurrentOrders = async () => {
    const userId = userData._id;
    try {
      const res = await fetch("/api/user-current-orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();

      if (!(res.status === 200)) {
        throw new Error(res.err);
      }
      setUserCurrentOrders(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getUserPreviousOrders = async () => {
    const userId = userData._id;
    try {
      const res = await fetch("/api/user-previous-orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();

      if (!(res.status === 200)) {
        throw new Error(res.err);
      }
      setUserPreviousOrders(data);
      console.log(userData, "hello");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(async () => {
    callAccountPage().then(() => {
      getUserCurrentOrders().then(() => {
        getUserPreviousOrders();
      });
    });
    
    console.log(userData, "hi2");



    
  }, []); //array dependency - means executes only once as the page gets loaded

  return (
    <>
      <Navbar />

      <div>
        <div className="wrapper " style={{ margin: "3%", paddingInline: "3%" }}>
          <div className="content">
            <div className="row">
              <div className="col-md-4" style={{ paddingRight: "1%" }}>
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
                        style={{ width: "15rem" }}
                        src={require("../../assets/img/mike.jpg")}
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
                        {userData.name}
                      </h5>
                      <p
                        className="description"
                        style={{ padding: "2%", margin: "0" }}
                      >
                        User
                      </p>
                    </div>
                    <hr style={{ marginTop: "1%", marginBottom: "1%" }} />
                    <div className="button-container">
                      <div className="row">
                        <div className="col-lg-6 ml-auto">
                          <h5>
                            12
                            <br />
                            <small>Orders</small>
                          </h5>
                        </div>
                        <div className="col-lg-6 mr-auto">
                          <h5>
                            ₹246
                            <br />
                            <small>Spent</small>
                          </h5>
                        </div>
                      </div>
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
                      Current Orders
                    </h4>
                  </div>
                  <div className="card-body">
                    <ul className="list-unstyled team-members">
                      <li>
                        <div className="row">
                          <div className="col-md-7 col-7">
                            Pizza
                            <br />
                          </div>
                          <div className="col-md-3 col-3 text-right">
                            <h6>₹150</h6>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="row">
                          <div className="col-md-7 col-7">
                            Pasta
                            <br />
                          </div>
                          <div className="col-md-3 col-3 text-right">
                            <h6>₹70</h6>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="row">
                          <div className="col-md-7 col-7">
                            Sandwich
                            <br />
                          </div>
                          <div className="col-md-3 col-3 text-right">
                            <h6>₹246</h6>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="row">
                          <div className="col-ms-7 col-7">
                            Taco
                            <br />
                          </div>
                          <div className="col-md-3 col-3 text-right">
                            <h6>₹100</h6>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
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
                              defaultValue={userData.name}
                              onChange={handleChangeValues("name")}
                            />
                          </div>
                        </div>
                        <div className="col-md-3 px-1">
                          <div className="form-group">
                            <label>Contact</label>
                            <input
                              type="Phone"
                              className="form-control"
                              placeholder="+91 *********"
                              defaultValue={userData.mobile}
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
                              defaultValue={userData.email}
                              onChange={handleChangeValues("email")}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label>Address</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Address"
                              defaultValue={userData.address}
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
                      Previous Orders
                    </h5>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table">
                        <thead className=" text-primary">
                          <tr style={{ color: "#941919" }}>
                            <th>Name</th>
                            <th>Restaurant</th>
                            <th>Quantity</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Pizza</td>
                            <td>Nescafe</td>
                            <td>1</td>
                            <td>12</td>
                          </tr>
                          <tr>
                            <td>Biryani</td>
                            <td>Nescafe</td>
                            <td>2</td>
                            <td>200</td>
                          </tr>
                          <tr>
                            <td>Soup</td>
                            <td>Nescafe</td>
                            <td>3</td>
                            <td>57</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
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

export default MyAccount;
