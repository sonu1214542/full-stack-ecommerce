import express from "express";
import { deleteUser, getAllUsers, getUser, newUser } from "../Controllers/UserController.js";
import { isAdmin } from "../Middleware/Auth.js";

const app = express.Router();


app.post("/new",newUser);
app.get("/allusers",isAdmin,getAllUsers);
app.get("/getuser/:id",getUser);
app.delete("/deleteuser/:id",deleteUser);

export default app;

