import React from 'react'
import { Link } from 'react-router-dom';
import "./CArtItem.css"
import { useDispatch } from 'react-redux';
import { addToCart, removeCartItem } from '../Redux/reducer/cartReducer';

const CartItem = ({ item}) => {
  const dispatch = useDispatch()
  const { photo, name, productId, price, quantity, stock } = item;
  const incrementhandler=()=>{
    if (parseInt(quantity)>=parseInt(stock)) {
      return
    }
    dispatch(addToCart({...item,quantity:item.quantity+1}))
  }
  const decrementhandler=()=>{
    if (parseInt(quantity)<=1) {
      return
    }
    dispatch(addToCart({...item,quantity:item.quantity-1}))
  }
  const removeproduct=()=>{
    console.log("first")
    dispatch(removeCartItem(productId))
  }
  return (
    <div className='product-card'>
      <div className='product-image-container'>
        <img src={photo} alt={name} className='product-image' />
      </div>
      <Link to={`products/${productId}`} className='product-name'>{name}</Link>
      <span className='product-price'>₹{price}</span>
      <div className='product-actions-container'>
        <button onClick={decrementhandler}>-</button>
        <p>{quantity}</p>
        <button onClick={incrementhandler}>+</button>
        <button onClick={removeproduct}>remove</button>
      </div>
    </div>
  )
}

export default CartItem