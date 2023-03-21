import { response, request } from "express"
import { SectionTextModels } from "../../../models/Models"


export const SectionTextDelete = async (req = request, res = response) => {
    try {
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

        await SectionTextModels.delete({
            where : {
                id : parseInt(id)
            }
        })

        res.status(200).json({
            success : true,
            msg : "Successfully delete section text!"
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}