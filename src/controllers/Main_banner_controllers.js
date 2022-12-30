import { request, response } from "express"
import path from "path"
import fs from "fs"
import { MainBannerModels } from "../models/Models"


//      MAIN BANNER CREATE
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

        res.status(201).json({
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

//      MAIN BANNER READ ALL
export const MainBannerRead = async (req = request, res = response) => {
    try {
        const { page = 1, limit = 10 } = await req.query
        let skip = (page - 1) * limit
        const { filter } = await req.body
        const result = await MainBannerModels.findMany({
            skip: parseInt(skip),
            take: parseInt(limit),
            orderBy: { id: "desc" },
            where : filter,
        })

        const conn = await MainBannerModels.count()

        res.status(200).json({
            success : true,
            current_page: parseInt(page),
            total_page : Math.ceil(conn / limit),
            total_data : conn,
            data : result
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}

//      MAIN BANNER UPDATE
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
            const storeMainBanner = await MainBannerModels.update({
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
            const deleteBannerFromServer = await fs.unlinkSync(
                path.join(__dirname, `../../static/public/uploads/banner/${findBanner.filename}`)
                )
        } else {
            const storeMainBanner = await MainBannerModels.update({
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

        res.status(201).json({
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

//      MAIN BANNER DELETE
export const MainBannerDelete = async (req = request, res = response) => {
    try {
        const { id } = await req.body
        const result = await MainBannerModels.delete({
            where : {
                id : parseInt(id)
            }
        })

        if(!result){
            res.status(401).json({
                success : false,
                msg : "Failed to delete main banner!"
            })
            return
        }

        //      DELETE IMAGE FROM SERVER
        const deleteBanner = await fs.unlinkSync(
            path.join(__dirname, `../../static/public/uploads/banner/${result.filename}`)
        )

        res.status(201).json({
            success : true,
            msg : "Successfully delete main banner!"
        })


    } catch (error) {
        res.status(500).json({
            success :false,
            error : error.message
        })
    }
}