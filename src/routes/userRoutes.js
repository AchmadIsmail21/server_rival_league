import express from "express"
import { loginUser, registerUser } from "../controllers/userController.js"

const user_routes = express.Router()

//routes create user
user_routes.post("/api/user/create", registerUser);

//routes login
user_routes.post("/api/user/login", loginUser)


export default user_routes;