import { response, request } from "express";
import { ProductModels } from "../../../models/Models";


export const ProductUpdate = async (req = request, res = response) => {
    try {
        const { id } = await req.params
        const data = await req.body
        const checkUniqueId = await ProductModels.findUnique({
            where : {
                id : parseInt(id)
            }
        })

        const checkUniqueCategoryId = await ProductModels.findFirst({
            where : {
                category_id : parseInt(data.category_id)
            }
        })

        if(checkUniqueId){
            return res.status(400).json({
                success : false,
                message : "Product id not found!"
            })
        }

        if(checkUniqueCategoryId){
            return res.status(400).json({
                success : false,
                message : "Category id not found!"
            })
        }

        await ProductModels.update({
            where : {
                id : parseInt(id)
            },
            data : {
                category_id : parseInt(data.category_id),
                name : data.name,
                logo : data.logo,
                background : data.background,
                youtube_link : data.youtube_link,
                instagram_link : data.instagram_link,
                twitter_link : data.twitter_link,
                telegram_link : data.telegram_link,
            }
        })

        res.status(200).json({
            success : true,
            message : "Product updated successfully!"
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}