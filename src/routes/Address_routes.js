import express from "express"
import { AddressCreate, AddressRead, AddressUpdate, AddressDelete } from "../controllers/Address_controllers"

const address_controllers = express.Router()


//  ADDRESS ROUTES
address_controllers.post("/address/create", AddressCreate)
address_controllers.post("/address/read", AddressRead)
address_controllers.put("/address/update", AddressUpdate)
address_controllers.delete("/address/delete", AddressDelete)


export default address_controllers
