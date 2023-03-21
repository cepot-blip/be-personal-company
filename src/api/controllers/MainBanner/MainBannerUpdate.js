import { request, response } from "express"
import { MainBannerModels } from "../../../models/Models"
import path from "path"
import fs from "fs"


export const MainBannerUpdate = async (req = request, res = response) => {
    try {
        const data = await req.body
        const { id } = await req.params
        const file = await req.file
        const checkUniqueId = await MainBannerModels.findFirst({
            where : {
                id : parseInt(id)
            }
        })

        const findBanner = await MainBannerModels.findUnique({
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

        if(file){
            await MainBannerModels.update({
                where : {
                    id : parseInt(id)
                },
                data : {
                    filename : file.filename,
                    location : `public/uploads/banner/${file.filename}`,
                    url : data.url,
                    title : data.title,
                    description : data.description,
                }
            })

            //      DELETE OLD IMAGE
            await fs.unlinkSync(
                path.join(__dirname, `../../static/public/uploads/banner/${findBanner.filename}`)
                )
        } else {
            await MainBannerModels.update({
                where : {
                    id : parseInt(id)
                },
                data : {
                    url : data.url,
                    title : data.title,
                    description : data.description,
                }
            })
        }

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