import express from "express"
import {rateLimit} from "express-rate-limit"
import { UsersCreate, UsersLogin, UsersReadAll, UsersUpdate, UsersDelete } from "../controllers/Users_controllers"

const users_controllers = express.Router()

const LimitLogin = rateLimit({
    windowMs : 15 * 60 * 1000,
    max : 10,
    standardHeaders: true,
	legacyHeaders: false,
    message : "Too many request from this IP, please try again after 15 minutes"
})


//      CREATE ROUTES USERS
users_controllers.post("/users/create", UsersCreate)
users_controllers.post("/users/login", LimitLogin, UsersLogin)
users_controllers.post("/users/read", UsersReadAll)
users_controllers.put("/users/update", UsersUpdate)
users_controllers.delete("/users/delete", UsersDelete)


export default users_controllers