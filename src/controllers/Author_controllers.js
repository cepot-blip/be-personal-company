import { response, request } from "express";
import { AuthorModels } from "../models/Models";


//      AUTHOR CREATE
export const AuthorCreate = async (req = request, res = response) => {
    try {
        const {
            name,
            avatar_id
        } = await req.body

        const result = await AuthorModels.create({
            data : {
                name : name,
                avatar_id: parseInt(avatar_id),
            }
        })

        res.status(201).json({
            success : true,
            msg : "Successfully create author!"
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}


//      AUTHOR READ
export const AuthorRead = async (req = request, res = response) => {
    try {
        const { page = 1, limit = 10 } = await req.query
        let skip = (page - 1) * limit
        const { filter } = await req.body
        const result = await AuthorModels.findMany({
            skip: parseInt(skip),
            take: parseInt(limit),
            orderBy: { id: "desc" },
            where: filter,
        })

        const conn = await AuthorModels.count()

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
            error : error.message
        })
    }
}


//      AUTHOR UPDATE
export const AuthorUpdate = async (req = request, res = response) => {
    try {
        const data = await req.body
        const { id } = await req.params
        const checkUniqueId = await AuthorModels.findUnique({
            where : {
                id : parseInt(id)
            }
        })

        if(!checkUniqueId) {
            res.status(404).json({
                success : false,
                msg : "Author Id not found!"
            })
        }

        const result = await AuthorModels.update({
            where : {
                id : parseInt(id)
            },
            data : {
                name : data.name,
                avatar_id : parseInt(data.avatar_id)

            }
        })


        res.status(200).json({
            success : true,
            msg : "Successfully update author!"
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}


//      AUTHOR DELETE
export const AuthorDelete = async (req = request, res = response) => {
    try {
        const { id } = await req.params
        const checkUniqueId = await AuthorModels.findUnique({
            where : {
                id : parseInt(id)
            }
        })

        if(!checkUniqueId) {
            res.status(404).json({
                success : false,
                msg : "Author Id not found!"
            })
        }

        const result = await AuthorModels.delete({
            where : {
                id : parseInt(id)
            }
        })

        res.status(200).json({
            success : true,
            msg : "Successfully delete author!"
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}