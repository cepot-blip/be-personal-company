import { response, request } from "express";
import { ProductModels } from "../../../models/Models";


export const ProductCreate = async (req = request, res = response) => {
    try {
        const {
            name,
            logo,
            background,
            youtube_link,
            instagram_link,
            twitter_link,
            telegram_link,
            category_id,
        } = await req.body

        const checkUniqueCategory = await ProductModels.findFirst({
            where: {
                category_id: parseInt(category_id)
            }
        })

        if (checkUniqueCategory) {
            return res.status(400).json({
                success: false,
                message: 'Category id not found!'
            })
        }

        await ProductModels.create({
            data: {
                name : name,
                logo : logo,
                background : background,
                youtube_link : youtube_link,
                instagram_link : instagram_link,
                twitter_link : twitter_link,
                telegram_link : telegram_link,
                category_id : parseInt(category_id),
            }
        })

        res.status(200).json({
            success : true,
            msg : "Product created successfully!"
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}