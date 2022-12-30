import express from "express"
import { AuthorCreate, AuthorDelete, AuthorRead, AuthorUpdate } from "../controllers/Author_controllers"

const author_controllers = express.Router()


//      AUTHOR ROUTES
author_controllers.post("/author/create", AuthorCreate)
author_controllers.post("/author/read", AuthorRead)
author_controllers.put("/author/update/:id", AuthorUpdate)
author_controllers.delete("/author/delete/:id", AuthorDelete)


export default author_controllers