import React, { useEffect, useState, useContext } from "react";
import Navbar from "../layout/Navbar";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const MyAccount = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);

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

    const regex_email =
      /^([a-z A-Z 0-9 \.-_]+)@([a-z A-Z 0-9 \.-_]+)\.([a-z]+)(\.[a-z]{2,5})?$/;
    //purpose of ? is it makes regex exp optional like whatever part u want

    const regex_mobile = /^[6-9][0-9]{9}$/;

    if (!regex_email.test(values.email)) {
      window.alert("Please enter a valid email");
      return;
    }

    if (!regex_mobile.test(values.mobile)) {
      window.alert(
        "Please enter a valid mobile number starting with digit >= 6"
      );
      return;
    }

    const res = await fetch("/api/update-account", {
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
      const res = await fetch("/api/account", {
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
      sessionStorage.setItem("userId", data._id);

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

  const orderReceived = async (userCurrentOrder) => {
    const orderId = userCurrentOrder._id;

    try {
      const res = await fetch("/api/order-received", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId }),
      });
      const data = await res.json();

      if (!(res.status === 201)) {
        throw new Error(res.err);
      }
      setRefresh(!refresh);
    } catch (err) {
      console.log(err);
    }
  };

  const getUserCurrentOrders = async () => {
    const userId = sessionStorage.getItem("userId");
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
    const userId = sessionStorage.getItem("userId");
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
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    callAccountPage().then(async () => {
      getUserCurrentOrders();
      getUserPreviousOrders();
      setLoading(false);
    });
  }, [refresh]);

  return (
    <>
      <Navbar />
      <p>{}</p>
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
                        style={{ width: "85%" }}
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
                      {userCurrentOrders.length && !loading ? (
                        <>
                          {userCurrentOrders.map((userCurrentOrder) => {
                            return (
                              <>
                                <div
                                  style={{
                                    textAlign: "center",
                                    boxShadow:
                                      "20px 20px 50px 10px silver inset",
                                  }}
                                >
                                  <h4>{userCurrentOrder.restaurantId.name}</h4>
                                  <p>{userCurrentOrder._id}</p>
                                  {userCurrentOrder.comment !== "" ? (
                                    <p>
                                      <b>Pre-Order Comment</b>
                                      <br />
                                      {userCurrentOrder.comment}
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <hr />
                                {userCurrentOrder.orderItems.map(
                                  (orderItem, i) => {
                                    return (
                                      <li key={i}>
                                        <div className="row">
                                          <div className="col-md-7 col-7">
                                            {orderItem.name}
                                            <br />
                                          </div>
                                          <div className="col-md-3 col-3 text-right">
                                            <h6>{orderItem.quantity}</h6>
                                          </div>
                                        </div>
                                      </li>
                                    );
                                  }
                                )}
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Button
                                    type="submit"
                                    variant="contained"
                                    onClick={() =>
                                      orderReceived(userCurrentOrder)
                                    }
                                    sx={{ mt: 1, bgcolor: "error.main" }}
                                  >
                                    Received
                                  </Button>
                                </div>
                                <hr />
                              </>
                            );
                          })}
                        </>
                      ) : (
                        <h4 style={{ textAlign: "center" }}>No orders</h4>
                      )}
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
                      {userPreviousOrders.length && !loading ? (
                        <>
                          {userPreviousOrders.map((userPreviousOrder) => {
                            return (
                              <>
                                <div
                                  style={{
                                    textAlign: "center",
                                    boxShadow:
                                      "20px 20px 50px 10px silver inset",
                                  }}
                                >
                                  <h4>{userPreviousOrder.restaurantId.name}</h4>
                                  <p>{userPreviousOrder._id}</p>
                                  {userPreviousOrder.comment !== "" ? (
                                    <p>
                                      <b>Pre-Order Comment</b>
                                      <br />
                                      {userPreviousOrder.comment}
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                </div>

                                <table
                                  className="table"
                                  style={{ textAlign: "center" }}
                                >
                                  <thead className=" text-primary">
                                    <tr style={{ color: "#941919" }}>
                                      <th>Sr</th>
                                      <th>Name</th>
                                      <th>Quantity</th>
                                      <th>Amount</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {userPreviousOrder.orderItems.map(
                                      (orderItem, i) => {
                                        return (
                                          <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{orderItem.name}</td>
                                            <td>{orderItem.quantity}</td>
                                            <td>{orderItem.amount}</td>
                                          </tr>
                                        );
                                      }
                                    )}
                                  </tbody>
                                </table>
                                <p style={{ textAlign: "center" }}>
                                  Total Amount: ₹{" "}
                                  {userPreviousOrder.orderItems.reduce(
                                    (sum, dish) =>
                                      sum + dish.price * dish.quantity,
                                    0
                                  )}
                                </p>
                                <hr />
                              </>
                            );
                          })}
                        </>
                      ) : (
                        <h4 style={{ textAlign: "center" }}>No orders</h4>
                      )}
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
