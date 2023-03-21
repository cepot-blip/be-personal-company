import { response, request } from "express";
import { CategoryModels } from "../../../models/Models";


export const CategoryUpdate = async (req = request, res = response) => {
    try {
        const data = await req.body
        const { id } = await req.params
        const checkUniqueId = await CategoryModels.findUnique({
            where : {
                id : parseInt(id)
            }
        })

        if (!checkUniqueId) {
           return res.status(400).json({
                success : false,
                msg : "Category not found!"
            })
        }

        await CategoryModels.update({
            where : {
                id : parseInt(id)
            },
            data : {
                name : data.name,
                slug : data.slug
            }
        })

        res.status(200).json({
            success : true,
            msg : "Successfully update category!"
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}