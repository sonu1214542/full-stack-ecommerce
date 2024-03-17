import React, { useEffect } from "react";
import "./Navbar.css";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../Firebase";
import { getUser, useLoginMutation } from "../Redux/Api/UserApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { userExist, userNotExist } from "../Redux/reducer/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, loading } = useSelector((state) => state.userReducer);
  console.log(user?.role);

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await getUser(user.uid);
        dispatch(userExist(data.user));
      } else {
        dispatch(userNotExist());
        console.log("not logged in");
      }
    });
  }, []);

  const [login] = useLoginMutation();

  const loginHandler = async () => {
    try {
      console.log(process.env.REACT_APP_SERVER);
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: "select_account",
      });
      const { user } = await signInWithPopup(auth, provider);
      const res = await login({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        role: "user",
        _id: user.uid,
      });
      if ("data" in res) {
        console.log(res.data.message);
      } else {
        console.log(res.error.message);
      }
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };
  const logoutHandler = async () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("logged out");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const showSidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "flex";
  };
  const closeSidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "none";
  };
  return (
    <div>
      <nav>
        <ul className="sidebar">
          <li onClick={() => closeSidebar()}>
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
                fill="black"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </a>
          </li>
          <li>
            <Link to={"/"} preventScrollReset={true}>
              Home
            </Link>
          </li>
          <li>
            <Link to={"/cart"}>cart</Link>
          </li>
          <li>
            <Link to={"/Orders"}>my orders</Link>
          </li>
          <li>
            <Link to={"/mywishlist"}>wishlist</Link>
          </li>
          <li>
            {loading ? (
              "loading..."
            ) : user && user.role === "admin" ? (
              <Link to={"/customerorders"}>customer orders</Link>
            ) : null}
          </li>

          <li>
            {loading ? (
              "loading..."
            ) : user ? (
              <button
                onClick={logoutHandler}
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 30px",
                }}
              >
                logout
              </button>
            ) : (
              <button
                onClick={loginHandler}
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 30px",
                }}
              >
                login
              </button>
            )}
          </li>
        </ul>
        <ul>
          <li className="hideOnMobile">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="hideOnMobile">
            <Link to={"/cart"}>cart</Link>
          </li>
          <li className="hideOnMobile">
            <Link to={"/Orders"}>my orders</Link>
          </li>
          <li>
            <Link to={"/mywishlist"}>wishlist</Link>
          </li>
          <li>
            {loading ? (
              "loading..."
            ) : user && user.role === "admin" ? (
              <Link to={"/customerorders"}>customer orders</Link>
            ) : null}
          </li>
          <li className="hideOnMobile">
            {loading ? (
              "loading..."
            ) : user ? (
              <button
                onClick={logoutHandler}
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 30px",
                }}
              >
                logout
              </button>
            ) : (
              <button
                onClick={loginHandler}
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 30px",
                }}
              >
                login
              </button>
            )}
          </li>
          <li className="menu-button" onClick={() => showSidebar()}>
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
                fill="black"
              >
                <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
              </svg>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
