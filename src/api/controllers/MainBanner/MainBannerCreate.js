import { request, response } from "express"
import { MainBannerModels } from "../../../models/Models"


export const MainBannerCreate = async (req = request, res = response) => {
    try {
        const data = await req.body
        
        await MainBannerModels.create({
            data : {
                url : data.url,
                title : data.title,
                description : data.description,
                images : data.images
            }
        })

        res.status(200).json({
            success : true,
            msg : "Successfully create main banner!"
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}