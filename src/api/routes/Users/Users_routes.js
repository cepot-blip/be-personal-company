import express from "express"
import {rateLimit} from "express-rate-limit"
import { UsersCreate, UsersLogin, UsersRead, UsersUpdate, UsersDelete } from "../../controllers/Users"

const users_routes = express.Router()

const LimitLogin = rateLimit({
    windowMs : 15 * 60 * 1000,
    max : 10,
    standardHeaders: true,
	legacyHeaders: false,
    message : "Too many request from this IP, please try again after 15 minutes"
})


//      CREATE ROUTES USERS
users_routes.post("/users/create", UsersCreate)
users_routes.post("/users/login", LimitLogin, UsersLogin)
users_routes.post("/users/read", UsersRead)
users_routes.put("/users/update", UsersUpdate)
users_routes.delete("/users/delete", UsersDelete)


export default users_routes