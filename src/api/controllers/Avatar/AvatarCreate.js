import { response, request } from "express"
import { AvatarModels } from "../../../models/Models"


export const AvatarCreate = async (req = request, res = response) => {
    try {
        const data = await req.body
        await AvatarModels.create({
            data : {
                images : data.images,   
                users_id : parseInt(data.users_id)
            }
        })

        res.status(200).json({
            success : true,
            msg : "Successfully create avatar!"
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}