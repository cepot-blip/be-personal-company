import { response, request } from "express";
import { ConfigModels, SectionTextModels } from "../../../models/Models";


export const ConfigReadById = async (req = request, res = response) => {
    try {
        const { page = 1, limit = 10 } = await req.query
        let skip = (page - 1) * limit
        const { filter } = await req.body
        const result = await ConfigModels.findMany({
            skip : parseInt(skip),
            take : parseInt(limit),
            orderBy : { id : "desc" },
            where : filter,
            select : [
                {
                    id : true,
                    name : true,
                    title : true,
                    description : true,
                    meta_title : true,
                    meta_description : true,
                    meta_image : true,
                    meta_url : true,
                }
            ]
        })
        
        const sectionText = await SectionTextModels.findMany({
            select : [
                {
                    id : true,
                    title : true,
                    description : true,
                }
            ]
        })

        const conn = await ConfigModels.count()

        res.status(200).json({
            success : true,
            current_page : parseInt(page),
            total_page : Math.ceil(conn / limit),
            total_data : conn,
            query : {result, sectionText}
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}