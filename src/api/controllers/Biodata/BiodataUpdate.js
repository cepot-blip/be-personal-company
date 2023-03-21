import { response, request } from "express"
import { BiodataModels } from "../../../models/Models"


export const BiodataUpdate = async (req = request, res = response) => {
    try {
        const data = await req.body
        const { id } = await req.params
        const checkUniqueId = await BiodataModels.findUnique({
            where : {
                id : parseInt(id)
            }
        })

        const checkUniqueAvatarId = await BiodataModels.findFirst({
            where : {
                avatar_id : parseInt(data.avatar_id)
            }
        })

        if (!checkUniqueId) {
            return res.status(404).json({
                success : false,
                msg : "Id not found!"
            })
        }

        if(checkUniqueAvatarId) {
            return res.status(400).json({
                success : false,
                msg : "Avatar Id not found!"
            })
        }

        await BiodataModels.update({
            where : {
                id : parseInt(id)
            },
            data : {
                email : data.email,
                phone : data.phone,
                nama_lengkap : data.nama_lengkap,
                avatar_id : parseInt(data.avatar_id)
            }
        })

        res.status(200).json({
            success : true,
            msg : "Successfully update biodata!"
        })
    
    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}