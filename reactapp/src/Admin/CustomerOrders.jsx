import React, { useState } from "react";
import {
  useAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../Redux/Api/OrderApi";
import "./CustomerOrders.css";

const CustomerOrders = () => {
  const [category, setCategory] = useState("");
  const [fromdate, setfromDate] = useState("");
  const [todate, settoDate] = useState("");
  const [status, setStatus] = useState("");
  const { data } = useAllOrdersQuery({ category, status, fromdate, todate });

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  return (
    <div className="orders-container" style={{ marginTop: "100px" }}>
      <h1 className="orders-title">Your Orders</h1>
      <p style={{ fontFamily: "fantasy" }}>
        total orders: {data?.message?.totalProducts}
      </p>
      <input
        placeholder="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      ></input>
      <input
        type="date"
        value={fromdate}
        onChange={(e) =>
          setfromDate(e.target.value, console.log(e.target.value))
        }
        pattern="\d{4}-\d{2}-\d{2}"
      ></input>
      <span>TO</span>
      <input
        type="date"
        value={todate}
        onChange={(e) => settoDate(e.target.value, console.log(e.target.value))}
        pattern="\d{4}-\d{2}-\d{2}"
      ></input>
      <input
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        placeholder="order status"
      ></input>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Status</th>
            <th>Subtotal</th>
            <th>Total</th>
            <th>Ordered On</th>
            <th>Shipping Address</th>
            <th>City</th>
            <th>State</th>
            <th>Pincode</th>
            <th>Order Items</th>
          </tr>
        </thead>
        <tbody>
          {data?.message?.allOrders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>
                <button
                  onClick={() => updateOrderStatus(order._id)}
                  style={{ cursor: "pointer" }}
                >
                  {order.status}
                </button>
              </td>
              <td>{order.subtotal}</td>
              <td>{order.total}</td>
              <td>{formatDate(order.createdAt)}</td>
              <td>{order.shippingInfo.address}</td>
              <td>{order.shippingInfo.city}</td>
              <td>{order.shippingInfo.state}</td>
              <td>{order.shippingInfo.pincode}</td>
              <td>
                <ul>
                  {order.orderItems.map((item, index) => (
                    <li key={index} style={{ listStyle: "none" }}>
                      {item.name} - Price: {item.price}
                      <p>Quantity: {item.quantity}</p>
                      <img
                        className="item-image"
                        src={item.photo}
                        alt={item.name}
                      />
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerOrders;
