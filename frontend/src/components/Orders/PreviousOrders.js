import React from "react";

const PreviousOrders = ({ restaurantPreviousOrders }) => {
  return (
    <div className="table-responsive">
      <h1>
        <b>Previous Orders</b>
        <hr />
      </h1>
      <div className="Items" style={{ margin: "2%" }}>
        {restaurantPreviousOrders.length ? (
          <>
            {restaurantPreviousOrders.map((restaurantPreviousOrder) => {
              return (
                <>
                  <div
                    style={{
                      textAlign: "center",
                      boxShadow: "20px 20px 50px 10px silver inset",
                    }}
                  >
                    <h4>Order Id: {restaurantPreviousOrder._id}</h4>
                    <br />
                    {restaurantPreviousOrder.comment !== "" ? (
                      <p>
                        <b>Pre-Order Comment</b>
                        <br />
                        {restaurantPreviousOrder.comment}
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
                      {restaurantPreviousOrder.orderItems.map(
                        (orderItem, i) => {
                          return (
                            <tr key={i}>
                              <td>{orderItem.name}</td>
                              <td>{orderItem.quantity}</td>
                              <td>{orderItem.amount}</td>
                              <td>{restaurantPreviousOrder.userId.name}</td>
                              <td>{restaurantPreviousOrder.userId.email}</td>
                              <td>{restaurantPreviousOrder.userId.mobile}</td>
                              <td>
                                <ul
                                  style={{ listStyleType: "none", padding: 0 }}
                                >
                                  <li>
                                    {
                                      restaurantPreviousOrder.delivery_address
                                        .address1
                                    }
                                    <br />
                                  </li>
                                  <li>
                                    {
                                      restaurantPreviousOrder.delivery_address
                                        .address2
                                    }
                                    <br />
                                  </li>
                                  <li>
                                    {
                                      restaurantPreviousOrder.delivery_address
                                        .city
                                    }
                                    <br />
                                  </li>
                                  <li>
                                    {
                                      restaurantPreviousOrder.delivery_address
                                        .zip
                                    }
                                    <br />
                                  </li>
                                </ul>
                              </td>
                              <td>{restaurantPreviousOrder.payment_mode}</td>
                            </tr>
                          );
                        }
                      )}
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

export default PreviousOrders;
