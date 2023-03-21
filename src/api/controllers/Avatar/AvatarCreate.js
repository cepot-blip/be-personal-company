import { response, request } from "express"
import { AvatarModels } from "../../../models/Models"


export const AvatarCreate = async (req = request, res = response) => {
    try {
        const file = await req.file
        const data = await req.body
        const storeAvatar = await AvatarModels.create({
            data : {
                filename : file.filename,
                location : `public/uploads/avatar/${file.filename}`,
                users_id : parseInt(data.users_id)
            }
        })

        if(!storeAvatar){
           return res.status(401).json({
                success : false,
                msg : "Failed to create avatar!"
            })
        }

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