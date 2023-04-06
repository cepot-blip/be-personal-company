import { response, request } from "express";
import { MillesstoneModels } from "../../../models/Models";


export const MillesstoneCreate = async (req = request, res = response) => {
    try {
        const {
            years,
            title,
            description,
            photo,
         } = await req.body 

         await MillesstoneModels.create({
                data : {
                    years : years,
                    title : title,
                    description : description,
                    photo : photo,
                }
         })

        return res.status(200).json({
            success : true,
            msg : "Millesstone created successfully!"
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}