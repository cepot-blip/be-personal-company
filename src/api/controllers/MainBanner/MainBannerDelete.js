import { request, response } from "express"
import { MainBannerModels } from "../../../models/Models"
import path from "path"
import fs from "fs"


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
        await fs.unlinkSync(
            path.join(__dirname, `../../static/public/uploads/banner/${result.filename}`)
        )

        res.status(200).json({
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