import express from "express";
import { singleUpload } from "../Middleware/Multer.js";
import { isAdmin } from "../Middleware/Auth.js";
import { addToWishlist, allOrders, myOrders, myWishlist, newOrder, updateOrderStatus } from "../Controllers/OrderController.js";

const app=express.Router();

app.post("/neworder",newOrder);
app.get("/myorders",myOrders);
app.get("/allorders",allOrders);
app.post("/addtowishlist",addToWishlist);
app.get("/mywishlist",myWishlist);
app.put("/updateorderstatus/:id",updateOrderStatus)

export default app;