import express from "express"
import { MainBannerCreate, MainBannerDelete, MainBannerRead, MainBannerUpdate } from "../../controllers/MainBanner"
import { banner_uploads } from "../../../libs/upload_services"

const banner_routes = express.Router()

//      SECTION TEXT ROUTES
banner_routes.post("/banner/create", banner_uploads.single("banner"),MainBannerCreate)
banner_routes.post("/banner/read", MainBannerRead)
banner_routes.put("/banner/update/:id", banner_uploads.single("banner"),MainBannerUpdate)
banner_routes.delete("/banner/delete", MainBannerDelete)


export default banner_routes