import express from "express"
import { BiodataCreate, BiodataRead, BiodataUpdate, BiodataDelete } from "../../controllers/Biodata"

const biodata_routes = express.Router()

//    BIODATA CREATE ROUTES
biodata_routes.post("/biodata/create", BiodataCreate)
biodata_routes.post("/biodata/read", BiodataRead)
biodata_routes.put("/biodata/update/:id", BiodataUpdate)
biodata_routes.delete("/biodata/delete/:id", BiodataDelete)

export default biodata_routes