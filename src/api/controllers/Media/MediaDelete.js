import { request, response } from "express";
import { MediaModels } from "../../../models/Models";


export const MediaDelete = async (req = request, res = response) => {
    try {
        const { id } = await req.params
        const checkUniqueId = await MediaModels.findUnique({
            where : {
                id : parseInt(id)
            }
        })

        if(!checkUniqueId){
            return res.status(400).json({
                success : false,
                msg : "Id not found!"
            })
        }

        await MediaModels.delete({
            where : {
                id : parseInt(id)
            }
        })

        res.status(200).json({
            success : true,
            msg : "Successfully delete media!"
        })

    } catch (error) {
        res.status(500).json({
            success :false,
            error : error.message
        })
    }
}