import { request, response } from "express"
import { MainBannerModels } from "../../../models/Models"


export const MainBannerUpdate = async (req = request, res = response) => {
    try {
        const data = await req.body
        const { id } = await req.params
        const checkUniqueId = await MainBannerModels.findUnique({
            where : {
                id : parseInt(id)
            }
        })

        if(!checkUniqueId){
            return res.status(401).json({
                success : false,
                msg : "Failed to update main banner!"
            })
        }

        await MainBannerModels.update({
            where : {
                id : parseInt(id)
            },
            data : {
                url : data.url,
                images : data.images,
                description : data.description,
            }
        })

        res.status(200).json({
            success : true,
            msg : "Successfully update main banner!"
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}