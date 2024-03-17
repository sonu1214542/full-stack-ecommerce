import express from "express";
import { singleUpload } from "../Middleware/Multer.js";
import { deleteProduct, getAllCategories, getAllProducts, getSingleProduct, newProduct, updateProduct } from "../Controllers/ProductController.js";
import { isAdmin } from "../Middleware/Auth.js";

const app=express.Router();

app.post("/new",singleUpload,newProduct);
app.get("/allcategory",getAllCategories);
app.get("/getsingleproduct/:productid",getSingleProduct);
app.put("/updateproduct/:productid",singleUpload,updateProduct);
app.get("/allproducts",getAllProducts);
app.delete("/deleteproduct/:productid",deleteProduct)

export default app;