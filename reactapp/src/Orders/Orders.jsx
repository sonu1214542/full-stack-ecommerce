import "./Orders.css";

import React from "react";
import "../Admin/ProductTable.css";
import { useSelector } from "react-redux";
import { useMyOrdersQuery } from "../Redux/Api/OrderApi";

const Orders = () => {
  const { user } = useSelector((state) => state.userReducer);
  const { data, isLoading, isError } = useMyOrdersQuery(user ? user._id : null);

  if (!user) {
    return <div>User not found.</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching orders.</div>;
  }

  if (!data || !Array.isArray(data.data) || data.data.length === 0) {
    return <div>No orders found.</div>;
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <div className="orders-container">
      <h1 className="orders-title">Your Orders</h1>
      <div className="orders-grid">
        {data.data.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <h2>Order ID: {order._id}</h2>
              <p>Status: {order.status}</p>
            </div>
            <div className="order-details">
              <p>Subtotal: {order.subtotal}</p>
              <p>Total: {order.total}</p>
              <p>ordered on :{formatDate(order.createdAt)}</p>
              <div className="shipping-info">
                <p>Shipping Info:</p>
                <p>Address: {order.shippingInfo.address}</p>
                <p>City: {order.shippingInfo.city}</p>
                <p>State: {order.shippingInfo.state}</p>
                <p>Pincode: {order.shippingInfo.pincode}</p>
              </div>
              <div className="order-items">
                <p>Order Items:</p>
                <ul>
                  {order.orderItems.map((item, index) => (
                    <li key={index}>
                      {item.name} - Price: {item.price}
                      <p>quantity:{item.quantity}</p>
                      <img
                        className="item-image"
                        src={item.photo}
                        alt={item.name}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
