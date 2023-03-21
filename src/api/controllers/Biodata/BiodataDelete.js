import { response, request } from "express"
import { BiodataModels } from "../../../models/Models"


export const BiodataDelete = async (req = request, res = response) => {
    try {
        const { id } = await req.params
        const checkUniqueId = await BiodataModels.findUnique({
            where : {
                id : parseInt(id)
            }
        })

        if (!checkUniqueId) {
            return res.status(404).json({
                success : false,
                msg : "Id not found!"
            })
        }

        await BiodataModels.delete({
            where : {
                id : parseInt(id)
            }
        })

        res.status(200).json({
            success : true,
            msg : "Successfully delete biodata!"
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}