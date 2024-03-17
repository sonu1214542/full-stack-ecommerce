import express, { urlencoded } from "express";
import UserRoutes from "./Routes/UserRoute.js"
import ProductRoutes from "./Routes/ProductRoutes.js"
import OrderRoutes from "./Routes/OrderRoutes.js"
import PaymentRoutes from "./Routes/PaymentRoutes.js"
import { connectDB } from "./Utils/features.js";
import morgan from "morgan";
import cors from "cors"
import Razorpay from "razorpay"
import { config } from "dotenv";
import dotenv from "dotenv"

const app = express();
app.use(cors(
    {origin:["http://localhost:4000/", "http://localhost:3000/"]}
));
app.use(urlencoded({extended:false}))

const port =4000;
dotenv.config();


export const instance = new Razorpay({ 
    key_id: process.env.RAZORPAY_API_KEY, 
    key_secret: process.env.RAZORPAY_API_SECRET 
})


connectDB();
app.use(express.json());
app.use(morgan("dev"));

app.use("/uploads",express.static("uploads"))

app.listen(port,()=>{console.log(port)})

app.use("/api/v1/user",UserRoutes)
app.use("/api/v1/product",ProductRoutes);
app.use("/api/v1/order",OrderRoutes);
app.use("/api/v1/payment",PaymentRoutes)


app.get("/api/getkey",(req,res,next)=>res.status(200).json({key:process.env.RAZORPAY_API_KEY}))

export default app;