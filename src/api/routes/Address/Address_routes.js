import express from "express"
import { AddressCreate, AddressRead, AddressDelete, AddressUpdate } from "../../controllers/Address"
const address_routes = express.Router()


//  ADDRESS ROUTES
address_routes.post("/address/create", AddressCreate)
address_routes.post("/address/read", AddressRead)
address_routes.put("/address/update/:id", AddressUpdate)
address_routes.delete("/address/delete/:id", AddressDelete)


export default address_routes
