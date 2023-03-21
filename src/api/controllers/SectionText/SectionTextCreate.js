import { response, request } from "express"
import { SectionTextModels } from "../../../models/Models"


export const SectionTextCreate = async (req = request, res = response) => {
    try {
        const {
            name,
            title,
            description,
        } = req.body
        
        await SectionTextModels.create({
            data : {
                name : name,
                title : title,
                description : description,
            }
        })

        res.status(200).json({
            success : true,
            msg : "Successfully create section text!"
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}