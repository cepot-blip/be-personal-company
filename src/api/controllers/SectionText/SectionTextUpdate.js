import { response, request } from "express"
import { SectionTextModels } from "../../../models/Models"


export const SectionTextUpdate = async (req = request, res = response) => {
    try {
        const data = await req.body
        const { id } = await req.params 
        const checkUniqueId = await SectionTextModels.findUnique({
            where : {
                id : parseInt(id)
            }
        })

        if (!checkUniqueId) {
            res.status(404).json({
                success : false,
                msg : "Section text not found!"
            })
        }

        await SectionTextModels.update({
            where : {
                id : parseInt(id)
            },
            data : {
                name : data.name,
                title : data.title,
                description : data.description,
            }
        })

        res.status(200).json({
            success : true,
            msg : "Successfully update section text!"
        })

       } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}
