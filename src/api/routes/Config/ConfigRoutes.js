import express from "express"
import { ConfigCreate, ConfigRead, ConfigReadById, ConfigDelete, ConfigUpdate } from "../../controllers/Config"

const config_routes = express.Router()

//  CONFIG ROUTES
config_routes.post("/config/create", ConfigCreate)
config_routes.post("/config/read", ConfigRead)
config_routes.get("/config/read/:id", ConfigReadById)
config_routes.put("/config/update/:id", ConfigUpdate)
config_routes.delete("/config/delete/:id", ConfigDelete)

export default config_routes
