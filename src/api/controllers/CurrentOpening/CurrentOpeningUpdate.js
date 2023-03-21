import { request, response } from "express"
import { CurrentOpeningModels } from "../../../models/Models"


export const CurrentOpeningUpdate = async (req = request, res = response) => {
    try {
        const data = await req.body 
        const { id } = await req.params
        const checkUniqueId = await CurrentOpeningModels.findUnique({
            where : {
                id : parseInt(id)
            }
        })

        if(!checkUniqueId){
           return res.status(404).json({
                success : false,
                msg : "Current opening id not found!"
            })
        }

        await CurrentOpeningModels.update({
            where : {
                id : parseInt(id)
            },
            data : {
                position : data.position,
                description : data.description,
                location : data.location,
                type : data.type,
                valid_until : data.valid_until,
                apply_link : data.apply_link,
                status : data.status,
                total_view : data.total_view
            }
        })

        res.status(200).json({
            success : true,
            msg : "Successfully update current opening!"
        })
        
    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}
