import { response, request } from "express";
import { CategoryModels } from "../../../models/Models";


export const CategoryDelete = async (req = request, res = response) => {
    try {
        const { id } = await req.params
        const checkUniqueId = await CategoryModels.findUnique({
            where : {
                id : parseInt(id)
            }
        })

        if (!checkUniqueId) {
           return res.status(400).json({
                success : false,
                msg : "Category id not found!"
            })
        }

        await CategoryModels.delete({
            where : {
                id : parseInt(id)
            }
        })

        res.status(200).json({
            success : true,
            msg : "Successfully delete category!"
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}