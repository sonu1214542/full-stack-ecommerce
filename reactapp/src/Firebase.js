// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBS8KZTqSNBpgph_-_KAOifP6PDzhRNutc",
  authDomain: "ajio-8a758.firebaseapp.com",
  projectId: "ajio-8a758",
  storageBucket: "ajio-8a758.appspot.com",
  messagingSenderId: "691701413645",
  appId: "1:691701413645:web:51c0e5d4d8abe294a1e244",
  measurementId: "G-PX9TXW89KT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);