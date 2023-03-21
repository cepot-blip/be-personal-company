import { response, request } from "express";
import { BlogModels } from "../../../models/Models";


export const BlogDelete = async (req = request, res = response) => {
    try {
        const { id } = await req.params
        const checkUniqueId = await BlogModels.findFirst({
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

        await BlogModels.delete({
            where : {
                id : parseInt(id)
            }
        })

        res.status(200).json({
            success : true,
            msg : "Successfully delete blog!",
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error :error.message
        })
    }
}