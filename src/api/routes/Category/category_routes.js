import express from "express";
import { CategoryCreate, CategoryDelete, CategoryRead, CategoryUpdate } from "../../controllers/Category";

const category_routes = express.Router();


//  CATEGORY ROUTES
category_routes.post("/category/create", CategoryCreate);
category_routes.post("/category/read", CategoryRead);
category_routes.put("/category/update/:id", CategoryUpdate);
category_routes.delete("/category/delete/:id", CategoryDelete);


export default category_routes;