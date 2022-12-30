import express from "express"
import { BiodataCreate, BiodataRead, BiodataUpdate, BiodataDelete } from "../controllers/Biodata_controllers"

const biodata_controllers = express.Router()

//    BIODATA CREATE ROUTES
biodata_controllers.post("/biodata/create", BiodataCreate)
biodata_controllers.post("/biodata/read", BiodataRead)
biodata_controllers.put("/biodata/update/:id", BiodataUpdate)
biodata_controllers.delete("/biodata/delete/:id", BiodataDelete)

export default biodata_controllers