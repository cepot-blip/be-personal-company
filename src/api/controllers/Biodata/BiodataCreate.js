import { response, request } from "express"
import { BiodataModels } from "../../../models/Models"


export const BiodataCreate = async (req = request, res = response) => {
    try {
        const {
           email,
           phone,
           nama_lengkap,
           avatar_id
        } = await req.body

        const checkUniqueAvatarId = await BiodataModels.findFirst({
            where : {
                avatar_id : parseInt(avatar_id)
            }
        })

        if (!checkUniqueAvatarId) {
            return res.status(400).json({
                success : false,
                msg : "Avatar id not found!"
            })
        }

        await BiodataModels.create({
            data : {
                email : email,
                avatar_id: parseInt(avatar_id),
                phone : phone,
                nama_lengkap : nama_lengkap
            }
        })

        res.status(201).json({
            success : true,
            msg : "Successfully create biodata!"
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}