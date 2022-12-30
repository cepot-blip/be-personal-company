import express from "express"
import { AvatarCreate, AvatarDelete, AvatarRead, AvatarUpdate } from "../controllers/Avatar_controllers"
import { avatar_uploads } from "../libs/upload_services"

const avatar_controllers = express.Router()


//      AVATAR ROUTES
avatar_controllers.post("/avatar/create",avatar_uploads.single("avatar"),AvatarCreate)
avatar_controllers.post("/avatar/read", AvatarRead)
avatar_controllers.put("/avatar/update/:id",avatar_uploads.single("avatar"), AvatarUpdate)
avatar_controllers.delete("/avatar/delete", AvatarDelete)


export default avatar_controllers

