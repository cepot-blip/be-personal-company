import { response, request } from "express"
import { SectionTextModels } from "../models/Models"


//             SECTION TEXT CREATE
export const SectionTextCreate = async (req = request, res = response) => {
    try {
        const {
            name,
            title,
            description,
        } = req.body
        
        const result = await SectionTextModels.create({
            data : {
                name : name,
                title : title,
                description : description,
            }
        })

        res.status(201).json({
            success : true,
            msg : "Successfully create section text!"
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}

//       SECTION TEXT READ
export const SectionTextRead = async (req = request, res = response) => {
    try {
        const { page = 1, limit = 10 } = req.query
        let skip = (page - 1) * limit
        const { filter } = req.body
        const result = await SectionTextModels.findMany({
            skip: parseInt(skip),
            take: parseInt(limit),
            orderBy: { id: "desc" },
            where: filter,
        })

        const conn = await SectionTextModels.count()

        res.status(200).json({
            success: true,
            current_page: parseInt(page),
            total_page: Math.ceil(conn / limit),
            total_data: conn,
            query: result,
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error :error.message
        })
    }
}

//      SECTION TEXT UPDATE
export const SectionTextUpdate = async (req = request, res = response) => {
    try {
        const data = await req.body
        const { id } = await req.params 
        const checkUniqueId = await SectionTextModels.findUnique({
            where : {
                id : parseInt(id)
            }
        })

        if (!checkUniqueId) {
            res.status(404).json({
                success : false,
                msg : "Section text not found!"
            })
        }

        const result = await SectionTextModels.update({
            where : {
                id : parseInt(id)
            },
            data : {
                name : data.name,
                title : data.title,
                description : data.description,
            }
        })

        res.status(200).json({
            success : true,
            msg : "Successfully update section text!"
        })

       } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}

//      SECTION TEXT DELETE
export const SectionTextDelete = async (req = request, res = response) => {
    try {
        const { id } = await req.params
        const checkUniqueId = await SectionTextModels.findUnique({
            where : {
                id : parseInt(id)
            }
        })

        if (!checkUniqueId) {
            res.status(404).json({
                success : false,
                msg : "Section text not found!"
            })
        }

        const result = await SectionTextModels.delete({
            where : {
                id : parseInt(id)
            }
        })

        res.status(200).json({
            success : true,
            msg : "Successfully delete section text!"
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}


