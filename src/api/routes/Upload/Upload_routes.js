import express from "express"
import { authCheck } from "../../middlewares/AuthGuard"
import { UploaderCreate, UploaderDelete } from "../../controllers/Upload"

const uploader_routes = express.Router()

uploader_routes.post("/uploader", authCheck, UploaderCreate)
uploader_routes.delete("/uploader/delete", authCheck, UploaderDelete)


export default uploader_routes