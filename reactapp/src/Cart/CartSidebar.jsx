import React from 'react';
import { useNavigate } from 'react-router-dom';

const CartSidebar = ({ subtotal, shipping, discount, total}) => {
  const navigate = useNavigate();
  const checkoutButton=()=>{
    navigate("/shipping")
  }
  return (
    <aside className="cart-" style={{position:"fixed", margin:"200px"}}>
      <h3 className="cart--title">Summary</h3>
      <ul className="cart-sidebar-list">
        <li className="cart-sidebar-item">
          <span className="cart-sidebar-label">Subtotal:</span>
          <span className="cart-sidebar-value">₹{subtotal}</span>
        </li>
        <li className="cart-sidebar-item">
          <span className="cart-sidebar-label">Shipping:</span>
          <span className="cart-sidebar-value">₹{shipping}</span>
        </li>
        <li className="cart-sidebar-item">
          <span className="cart-sidebar-label">Discount:</span>
          <span className="cart-sidebar-value">₹{discount}</span>
        </li>
        <li className="cart-sidebar-item cart-sidebar-total">
          <span className="cart-sidebar-label">Total:</span>
          <span className="cart-sidebar-value">₹{total}</span>
        </li>
      </ul>
      <button className="checkout-button" onClick={()=>checkoutButton()}>Checkout</button>
    </aside>
  );
};

export default CartSidebar;