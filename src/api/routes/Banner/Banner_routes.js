import express from "express"
import { MainBannerCreate, MainBannerDelete, MainBannerRead, MainBannerUpdate } from "../../controllers/MainBanner"
const banner_routes = express.Router()

//      SECTION TEXT ROUTES
banner_routes.post("/banner/create" ,MainBannerCreate)
banner_routes.post("/banner/read", MainBannerRead)
banner_routes.put("/banner/update/:id" ,MainBannerUpdate)
banner_routes.delete("/banner/delete", MainBannerDelete)


export default banner_routes