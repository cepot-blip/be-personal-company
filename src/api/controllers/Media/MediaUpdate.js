import { request, response } from "express";
import { MediaModels } from "../../../models/Models";


export const MediaUpdate = async (req = request, res = response) => {
    try {
        const { id } = await req.params
        const data = await req.body

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

        await MediaModels.update({
            where : {
                id : parseInt(id)
            },
            data : {
                name : data.name,
                description : data.description,
                type : data.type,
                extention : data.extention,
                images : data.images,
                media_meta : data.media_meta,
                media_url : data.media_url,
                image_source : data.image_source,
                status : data.status
            }
        })

        res.status(200).json({
            success : true,
            msg : "Successfully update media!"
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}