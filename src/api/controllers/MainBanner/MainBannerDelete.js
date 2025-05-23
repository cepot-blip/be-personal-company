import { request, response } from "express"
import { MainBannerModels } from "../../../models/Models"


export const MainBannerDelete = async (req = request, res = response) => {
    try {
        const { id } = await req.params
        const checkUniqueId = await MainBannerModels.findUnique({
            where : {
                id : parseInt(id)
            }
        })

        if(!checkUniqueId){
            return res.status(400).json({
                success : false,
                msg : "Id not found!"
            })
        }

        await MainBannerModels.delete({
            where : {
                id : parseInt(id)
            }
        })

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