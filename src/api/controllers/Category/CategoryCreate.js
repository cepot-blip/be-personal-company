import { response, request } from "express";
import { CategoryModels } from "../../../models/Models";


export const CategoryCreate = async (req = request, res = response) => {
    try {
        const {
            name,
            slug
        } = await req.body

        await CategoryModels.create({
            data : {
                name : name,
                slug : slug
            }
        })

        res.status(200).json({
            success : true,
            msg : "Successfully create category!"
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}
