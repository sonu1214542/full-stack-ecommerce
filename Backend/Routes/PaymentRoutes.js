import express  from "express"
import {  checkout, paymentVerification } from "../Controllers/PaymentController.js";

const app = express.Router();

app.post("/checkout",checkout);
app.post("/paymentverification",paymentVerification)

export default app;
