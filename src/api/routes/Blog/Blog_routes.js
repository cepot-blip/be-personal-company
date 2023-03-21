import express from "express"
import { BlogCreate, BlogDelete, BlogRead, BlogUpdate } from "../../controllers/Blog"

const blog_routes = express.Router()


//      BLOG CREATE ROUTES
blog_routes.post("/blog/create", BlogCreate)
blog_routes.post("/blog/read", BlogRead)
blog_routes.put("/blog/update/:id", BlogUpdate)
blog_routes.delete("/blog/delete/:id", BlogDelete)


export default blog_routes