import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Home from "./Home";
import CreateProduct from "./Admin/CreateProduct";
import ProductTablePage from "./Admin/ProductTablePage";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./Redux/Api/UserApi";
import { userExist, userNotExist } from "./Redux/reducer/userReducer";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase";
import PaymentSuccess from "./PaymentSuccess";

// Lazy-loaded components
const Search = lazy(() => import("./Search/Search"));
const Shipping = lazy(() => import("./Shipping/Shipping"));
const Signup = lazy(() => import("./Auth/Signup"));
const Orders = lazy(() => import("./Orders/Orders"));
const ProductCard = lazy(() => import("./ProductCard/ProductCard"));
const Cart = lazy(() => import("./Cart/Cart"));
const CustomerOrders = lazy(() => import("./Admin/CustomerOrders"));
const UpdateProduct = lazy(() => import("./Admin/UpdateProduct"));
const MyWishlist = lazy(() => import("./MyWishlist"));

const App = () => {
  const {user,loading} = useSelector((state)=>state.userReducer);
  const dispatch =  useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await getUser(user?.uid);
        dispatch(userExist(data?.user));
        console.log("logged in");
      } else {
        dispatch(userNotExist());
        console.log("not looged in");
      }
    });
  }, []);
  
  return (
    <div>
      <Router>
        <Navbar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mywishlist" element={user?<MyWishlist/>:<Signup/>} />
            <Route path="/customerorders" element={<CustomerOrders />} />
            <Route path="/search" element={<Search />} />
            <Route path="/productcard" element={<ProductCard />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/shipping" element={user?<Shipping/>:<Signup/>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/createproduct" element={<CreateProduct />} />
            <Route path="/producttable" element={<ProductTablePage />} />
            <Route path="/paymentsuccess" element={<PaymentSuccess/>}/>
            <Route
              path="/updateproduct/:productid"
              element={<UpdateProduct />}
            />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
};

export default App;
