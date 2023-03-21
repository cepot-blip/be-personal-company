import express from "express"
import { SectionTextCreate, SectionTextDelete, SectionTextRead, SectionTextUpdate } from "../../controllers/SectionText"

const section_text_routes = express.Router()

//      SECTION TEXT ROUTES
section_text_routes.post("/sectiontext/create", SectionTextCreate)
section_text_routes.post("/sectiontext/read", SectionTextRead)
section_text_routes.put("/sectiontext/update/:id", SectionTextUpdate)
section_text_routes.delete("/sectiontext/delete/:id", SectionTextDelete)


export default section_text_routes