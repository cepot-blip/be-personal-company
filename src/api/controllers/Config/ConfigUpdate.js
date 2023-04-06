import { response, request } from "express";
import { ConfigModels } from "../../../models/Models";


export const ConfigUpdate = async (req = request, res = response) => {
    try {
        const { id } = await req.params
        const data = await req.body
        const checkUniqueId = await ConfigModels.findUnique({
            where : {
                id : parseInt(id)
            }
        })

        if(!checkUniqueId) return res.status(400).json({
            success : false,
            msg : "Config id not found!"
        })

        await ConfigModels.update({
            where : {
                id : parseInt(id)
            },
            data : {
                name : data.name,
                title : data.title,
                description : data.description,
                meta_title : data.meta_title,
                meta_description : data.meta_description,
                meta_image : data.meta_image,
                meta_url : data.meta_url,
            }
        })

        res.status(200).json({
            success : true,
            msg : "Config updated successfully!"
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}