import express from "express"
import { AvatarCreate, AvatarDelete, AvatarRead, AvatarUpdate } from "../../controllers/Avatar"
import { avatar_uploads } from "../../../libs/upload_services"

const avatar_routes = express.Router()


//      AVATAR ROUTES
avatar_routes.post("/avatar/create",avatar_uploads.single("avatar"),AvatarCreate)
avatar_routes.post("/avatar/read", AvatarRead)
avatar_routes.put("/avatar/update/:id",avatar_uploads.single("avatar"), AvatarUpdate)
avatar_routes.delete("/avatar/delete", AvatarDelete)


export default avatar_routes

