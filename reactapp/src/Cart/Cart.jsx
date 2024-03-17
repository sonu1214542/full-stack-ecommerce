import React, { useEffect } from 'react';
import './Cart.css';
import iphone from "../iphone.webp"
import CartItem from "./CartItem"
import CartSidebar from './CartSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { calculatePrice } from '../Redux/reducer/cartReducer';


const Cart = () => {
  const dispatch = useDispatch();
  const {cartItems,subtotal,total,shippingCharges,discount} = useSelector((state)=>state.cartReducer);
  useEffect(() => {
    dispatch(calculatePrice())
  }, [cartItems])
  
  return (
    <div className="cart-page">
      <h1 className="cart-page-title">Cart</h1>
      <div className="cart-items">
        {cartItems.map((i, index) => (
          <CartItem key={index} item={i} />
        ))}
      </div>
      {cartItems.length>0?<CartSidebar subtotal={subtotal} shipping={shippingCharges} discount={discount} total={total}/>:null}
      
    </div>
  );
};

export default Cart;