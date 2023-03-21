import express from "express"
import { AuthorCreate, AuthorDelete, AuthorRead, AuthorUpdate } from "../../controllers/Author"

const author_routes = express.Router()


//      AUTHOR ROUTES
author_routes.post("/author/create", AuthorCreate)
author_routes.post("/author/read", AuthorRead)
author_routes.put("/author/update/:id", AuthorUpdate)
author_routes.delete("/author/delete/:id", AuthorDelete)


export default author_routes