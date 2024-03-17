import React from "react";
import "./ProductCard.css";
import iphone from "../iphone.webp";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/reducer/cartReducer";
import { useAddToWishlistMutation } from "../Redux/Api/WishlistApi";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.userReducer);
  const addToCartHandler = (cartItem) => {
    if (
      !product.stock ||
      product.stock < 1
    ) {
      alert("out of stock");
      return;
    }
    dispatch(addToCart(cartItem));
    console.log(product._id);
  };

  const [addtowishlist] = useAddToWishlistMutation();


  const addToWishlistHandler = () => {
    if (!user) {
      alert("please login in to add product to wishlist");
      return
    }
    addtowishlist({
      wishlistItems: [
        {
          productId: product._id,
          name: product.name,
          photo: product.photo,
          price: product.price,
          category: product.category,
        },
      ],
      user: user._id,
    })
      .unwrap()
      .then((data) => {
        // Handle successful wishlist addition
        console.log("Item added to wishlist:", data);
      })
      .catch((error) => {
        // Handle error
        console.error("Failed to add item to wishlist:", error);
      });
  };

  return (
    <div className="card">
      <img
        className="image"
        src={`http://localhost:4000/${product.photo}`}
        alt="Product"
      />
      <div className="details">
        <div className="name">{product.name}</div>
        <div className="price">₹{product.price}</div>
        <button
          className="add-to-cart-button"
          onClick={() =>
            addToCartHandler({
              photo: `http://localhost:4000/${product.photo}`,
              productId: product._id,
              name: product.name,
              stock: product.stock,
              quantity: 1,
              price: product.price,
              //color: product.colors[0],
              category: product.category,
            })
          }
        >
          Add to Cart
        </button>
        <button onClick={addToWishlistHandler}>wishlist</button>
      </div>
    </div>
  );
};

export default ProductCard;
