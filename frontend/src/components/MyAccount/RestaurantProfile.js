import React, { useEffect, useState } from "react";
import Navbar from "../layout/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../layout/Footer";

const RestaurantProfile = () => {
  const { id } = useParams();

  const [restaurant, setRestaurant] = useState({});
  const [menu, setMenu] = useState({});

  const callRestaurantProfilePage = async () => {
    try {
      const res = await fetch(`/api/restaurantprofile/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (!(res.status === 200)) {
        throw new Error(res.err);
      }
      setRestaurant(data.rootRestaurant);
      setMenu(data.menu);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    callRestaurantProfilePage();
  }, []); //array dependency - means executes only once as the page gets loaded

  return (
    <>
      <Navbar />

      <div
        className="wrapper "
        style={{ margin: "1%", marginBottom: "2%", paddingInline: "3%" }}
      >
        <div className="content">
          <div className="row">
            <div
              className="col-md-5"
              style={{ marginTop: "2%", paddingRight: "1%" }}
            >
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
                      style={{ width: "85%", marginBottom: "1%" }}
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
                      {restaurant.name}
                    </h5>
                    <p className="description"></p>
                  </div>
                  <hr style={{ marginTop: "1%", marginBottom: "1%" }} />
                  <div className="button-container">
                    <div className="row">
                      <div
                        className="col-lg-4 ml-auto"
                        style={{
                          textAlign: "left",
                          padding: "0",
                          paddingTop: "2%",
                        }}
                      >
                        <p>Address</p>
                      </div>
                      <div
                        className="col-lg-7 mr-auto"
                        style={{
                          textAlign: "right",
                          padding: "0",
                          paddingTop: "2%",
                        }}
                      >
                        <p>{restaurant.address}</p>
                      </div>
                    </div>
                  </div>
                  <hr style={{ marginTop: "1%", marginBottom: "1%" }} />
                  <div className="button-container">
                    <div className="row">
                      <div
                        className="col-lg-4 ml-auto"
                        style={{
                          textAlign: "left",
                          padding: "0",
                          paddingTop: "2%",
                        }}
                      >
                        <p>Email</p>
                      </div>
                      <div
                        className="col-lg-7 mr-auto"
                        style={{
                          textAlign: "right",
                          padding: "0",
                          paddingTop: "2%",
                        }}
                      >
                        <p>{restaurant.email}</p>
                      </div>
                    </div>
                  </div>
                  <hr style={{ marginTop: "1%", marginBottom: "1%" }} />
                  <div className="button-container">
                    <div className="row">
                      <div
                        className="col-lg-4 ml-auto"
                        style={{
                          textAlign: "left",
                          padding: "0",
                          paddingTop: "2%",
                        }}
                      >
                        <p>Contact Number</p>
                      </div>
                      <div
                        className="col-lg-7 mr-auto"
                        style={{
                          textAlign: "right",
                          padding: "0",
                          paddingTop: "2%",
                        }}
                      >
                        <p>{restaurant.mobile}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-7" style={{ marginTop: "2%" }}>
              <div
                className="card card-user"
                style={{
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
                        {menu.length === 0 && (
                          <tr>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                          </tr>
                        )}
                        {menu.length > 0 && (
                          <>
                            {menu.map((dish) => (
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

      <Footer />
    </>
  );
};

export default RestaurantProfile;
