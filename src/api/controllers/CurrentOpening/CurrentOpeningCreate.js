import { request, response } from "express"
import { CurrentOpeningModels } from "../../../models/Models"


export const CurrentOpeningCreate = async (req = request, res = response) => {
    try {
        const {
            position,
            description,
            location,
            type,
            valid_until,
            apply_link,
            status,
            total_view
        } = await req.body

        await CurrentOpeningModels.create({
            data : {
                position : position,
                description : description,
                location : location,
                type : type,
                valid_until : valid_until,
                apply_link : apply_link,
                status : status,
                total_view : total_view
            }
        })

        res.status(201).json({
            success : true,
            msg : "Successfully create current opening!"
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}