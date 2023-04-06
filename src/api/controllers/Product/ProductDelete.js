import { response, request } from "express";
import { ProductModels } from "../../../models/Models";


export const ProductDelete = async (req = request, res = response) => {
    try {
        const{ id } = await req.params
        const checkUniqueId = await ProductModels.findUnique({
            where : {
                id : parseInt(id)
            }
        })

        if(checkUniqueId){
            return res.status(400).json({
                success : false,
                message : "Product id not found!"
            })
        }

        await ProductModels.delete({
            where : {
                id : parseInt(id)
            }
        })

        res.status(200).json({
            success : true,
            message : "Product deleted successfully!"
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}