import { request, response } from "express"
import { MainBannerModels } from "../../../models/Models"


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