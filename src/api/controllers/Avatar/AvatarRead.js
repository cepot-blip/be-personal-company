import { response, request } from "express"
import { AvatarModels } from "../../../models/Models"


export const AvatarRead = async (req = request, res = response) => {
    try {
        const { page = 1, limit = 10 } = await req.query
        let skip = (page - 1) * limit
        const { filter } = await req.body
        const result = await AvatarModels.findMany({
            skip: parseInt(skip),
            take: parseInt(limit),
            orderBy: { id: "desc" },
            where : filter,
        })

        const conn = await AvatarModels.count()

        res.status(200).json({
            success : true,
            current_page: parseInt(page),
            total_page : Math.ceil(conn / limit),
            total_data : conn,
            query : result
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}
