import { response, request } from "express";
import { ConfigModels } from "../../../models/Models";


export const ConfigCreate = async (req = request, res = response) => {
    try {
        const {
            name,
            title,
            description,
            meta_title,
            meta_description,
            meta_image,
            meta_url,
        } = await req.body;
        
        await ConfigModels.create({
            data : {
                name,
                title,
                description,
                meta_title,
                meta_description,
                meta_image,
                meta_url,
            }
        })

        return res.status(200).json({
            success : true,
            msg : "Config created successfully!"
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}