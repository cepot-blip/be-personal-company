import express from "express"
import { AvatarCreate, AvatarDelete, AvatarRead, AvatarUpdate } from "../../controllers/Avatar"
const avatar_routes = express.Router()


//      AVATAR ROUTES
avatar_routes.post("/avatar/create", AvatarCreate)
avatar_routes.post("/avatar/read", AvatarRead)
avatar_routes.put("/avatar/update/:id", AvatarUpdate)
avatar_routes.delete("/avatar/delete", AvatarDelete)


export default avatar_routes

