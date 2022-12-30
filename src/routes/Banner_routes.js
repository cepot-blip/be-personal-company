import express from "express"
import { MainBannerCreate, MainBannerDelete, MainBannerRead, MainBannerUpdate } from "../controllers/Main_banner_controllers"
import { banner_uploads } from "../libs/upload_services"

const banner_controllers = express.Router()

//      SECTION TEXT ROUTES
banner_controllers.post("/banner/create", banner_uploads.single("banner"),MainBannerCreate)
banner_controllers.post("/banner/read", MainBannerRead)
banner_controllers.put("/banner/update/:id", banner_uploads.single("banner"),MainBannerUpdate)
banner_controllers.delete("/banner/delete", MainBannerDelete)


export default banner_controllers