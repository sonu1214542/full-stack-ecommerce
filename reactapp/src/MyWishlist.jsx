import React, { useEffect } from "react";
import { useGetMyWishlistQuery } from "./Redux/Api/WishlistApi";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "./Redux/Api/UserApi";
import "./MyWishlist.css"; // Import CSS file

const MyWishlist = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.userReducer);
  const { data, isFetching, error } = useGetMyWishlistQuery(user?._id);

  useEffect(() => {
    const fetchData = async () => {
      if (!user && !loading) {
        await dispatch(getUser()); // Assuming getUser action creator is defined correctly
      }
    };

    fetchData();
  }, [dispatch, user, loading]);

  return (
    <div className="my-wishlist-container">
      <h2>My Wishlist</h2>
      {loading && <p className="loading-message">Loading...</p>}
      {error && <p className="error-message">Error: {error.message}</p>}
      {user ? (
        <p>{user.username}</p>
      ) : (
        !loading && <p className="error-message">User not found</p>
      )}
      {isFetching && <p className="fetching-message">Fetching...</p>}
      <div className="wishlist">
        {data &&
          data.message &&
          data.message.map((message) =>
            message.wishlistItems.map((item) => (
              <div className="wishlist-item" key={item._id}>
                {item.photo ? (
                  <img
                    src={`http://localhost:4000/${item.photo}`}
                    alt={item.name}
                  />
                ) : (
                  <span>No Image Available</span>
                )}
                <div className="item-details">
                  <p>{item.name}</p>
                  <p>{item.price}</p>
                </div>
              </div>
            ))
          )}
      </div>
    </div>
  );
};

export default MyWishlist;
