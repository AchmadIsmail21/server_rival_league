import express from "express"
import { getUserById, loginUser, registerUser } from "../controllers/userController.js"
import { verifyToken } from "../middleware/auth.js";

const user_routes = express.Router()

//routes create user
user_routes.post("/api/user/create", registerUser);

//routes login
user_routes.post("/api/user/login", loginUser);

//routes get user by id
user_routes.get("/api/user/:id", verifyToken, getUserById);


export default user_routes;