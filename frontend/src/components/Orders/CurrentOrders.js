import React from "react";

const CurrentOrders = ({ restaurantCurrentOrders }) => {
  return (
    <div className="table-responsive">
      <h1>
        <b>Current Orders</b>
        <hr />
      </h1>
      <div className="Items" style={{ margin: "2%" }}>
        {restaurantCurrentOrders.length ? (
          <>
            {restaurantCurrentOrders.map((restaurantCurrentOrder) => {
              return (
                <>
                  <div
                    style={{
                      textAlign: "center",
                      boxShadow: "20px 20px 50px 10px silver inset",
                    }}
                  >
                    <h4>Order Id: {restaurantCurrentOrder._id}</h4>
                    <br />
                    {restaurantCurrentOrder.comment !== "" ? (
                      <p>
                        <b>Pre-Order Comment</b>
                        <br />
                        {restaurantCurrentOrder.comment}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>

                  <table className="table">
                    <thead className=" text-primary">
                      <tr style={{ color: "#941919" }}>
                        <th>Dish</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                        <th>Customer</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Delivery Address</th>
                        <th>Payment Method</th>
                      </tr>
                    </thead>
                    <tbody>
                      {restaurantCurrentOrder.orderItems.map((orderItem, i) => {
                        return (
                          <tr key={i}>
                            <td>{orderItem.name}</td>
                            <td>{orderItem.quantity}</td>
                            <td>{orderItem.amount}</td>
                            <td>{restaurantCurrentOrder.userId.name}</td>
                            <td>{restaurantCurrentOrder.userId.email}</td>
                            <td>{restaurantCurrentOrder.userId.mobile}</td>
                            <td>
                              <ul style={{ listStyleType: "none", padding: 0 }}>
                                <li>
                                  {
                                    restaurantCurrentOrder.delivery_address
                                      .address1
                                  }
                                  <br />
                                </li>
                                <li>
                                  {
                                    restaurantCurrentOrder.delivery_address
                                      .address2
                                  }
                                  <br />
                                </li>
                                <li>
                                  {restaurantCurrentOrder.delivery_address.city}
                                  <br />
                                </li>
                                <li>
                                  {restaurantCurrentOrder.delivery_address.zip}
                                  <br />
                                </li>
                              </ul>
                            </td>
                            <td>{restaurantCurrentOrder.payment_mode}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
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
  );
};

export default CurrentOrders;
