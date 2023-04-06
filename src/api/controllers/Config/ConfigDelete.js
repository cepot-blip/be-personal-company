import { response, request } from "express";
import { ConfigModels } from "../../../models/Models";


export const ConfigDelete = async (req = request, res = response) => {
    try {
        const { id } = await req.params;
        const checkUniqueId = await ConfigModels.findUnique({
            where : {
                id : parseInt(id)
            }
        })

        if(!checkUniqueId) return res.status(400).json({
            success : false,
            msg : "Config id not found!"
        })
        
        await ConfigModels.delete({
            where : {
                id : parseInt(id)
            }
        })

        return res.status(200).json({
            success : true,
            msg : "Config deleted successfully!"
        }) 
    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}