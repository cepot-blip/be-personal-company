import { request, response } from "express"
import { MainBannerModels } from "../../../models/Models"


export const MainBannerCreate = async (req = request, res = response) => {
    try {
        const file = await req.file
        const data = await req.body
        const storeMainBanner = await MainBannerModels.create({
            data : {
                filename : file.filename,
                location : `public/uploads/banner/${file.filename}`,
                url : data.url,
                title : data.title,
                description : data.description,
            }
        })

        if(!storeMainBanner){
              return res.status(401).json({
                 success : false,
                 msg : "Failed to create main banner!"
                })
        }

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