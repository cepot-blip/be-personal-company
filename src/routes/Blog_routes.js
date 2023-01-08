import express from "express"
import { BlogCreate, BlogDelete, BlogRead, BlogUpdate } from "../controllers/Blog_controllers"

const blog_controllers = express.Router()


//      BLOG CREATE ROUTES
blog_controllers.post("/blog/create", BlogCreate)
blog_controllers.post("/blog/read", BlogRead)
blog_controllers.put("/blog/update/:id", BlogUpdate)
blog_controllers.delete("/blog/delete/:id", BlogDelete)


export default blog_controllers