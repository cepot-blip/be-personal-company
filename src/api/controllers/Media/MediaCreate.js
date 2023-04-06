import { request, response } from "express";
import { MediaModels } from "../../../models/Models";


export const MediaCreate = async (req = request, res = response) => {
    try {
        const {
            name,
            type,
            description,
            images,
            media_meta,
            extention,
            media_url,
            image_source,
            status
        } = await req.body

        await MediaModels.create({
            data : {
                name : name,
                type : type,
                description : description,
                images : images,
                media_meta : media_meta,
                extention : extention,
                media_url : media_url,
                image_source : image_source,
                status : status
            }
        })

        res.status(200).json({
            success : true,
            msg : "Successfully create media!"
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}