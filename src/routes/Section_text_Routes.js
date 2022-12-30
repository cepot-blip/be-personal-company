import express from "express"

import { SectionTextCreate, SectionTextDelete, SectionTextRead, SectionTextUpdate } from "../controllers/Section_text_controllers.js"

const section_text_controllers = express.Router()

//      SECTION TEXT ROUTES
section_text_controllers.post("/sectiontext/create", SectionTextCreate)
section_text_controllers.post("/sectiontext/read", SectionTextRead)
section_text_controllers.put("/sectiontext/update/:id", SectionTextUpdate)
section_text_controllers.delete("/sectiontext/delete/:id", SectionTextDelete)


export default section_text_controllers