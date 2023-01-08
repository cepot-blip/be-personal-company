import { response, request } from "express";
import { BlogModels } from "../models/Models";
import moment from "moment";


//  BLOG CREATE
export const BlogCreate = async (req = request, res = response) => {
    try {
        const {
            title,
            slug,
            tags,
            description,
            relase_date,
            excrept,
            meta_title,
            meta_tags,
            meta_description,
            visited_count,
            tiny_url,
            flag,
            users_id,
            author_id,
            media_id,
            category    
        } = await req.body

        const checkUniqueId = await BlogModels.findFirst({
            where : {
                users_id : parseInt(users_id)
            }
        })

        const checkUniqueAuthorId = await BlogModels.findFirst({
            where : {
                author_id : parseInt(author_id)
            }
        })

        const checkUniqueMediaId = await BlogModels.findFirst({
            where : {
                media_id : parseInt(media_id)
            }
        })

        if (!checkUniqueId) {
            return res.status(400).json({
                success : false,
                msg : "Users id not found!"
            })
        }

        if (!checkUniqueAuthorId) {
            return res.status(400).json({
                success : false,
                msg : "Author id not found!"
            })
        }

        if (!checkUniqueMediaId) {
            return res.status(400).json({
                success : false,
                msg : "Media id not found!"
            })
        }

        const result = await BlogModels.create({
            data : {
                title : title,
                slug : slug,
                tags : tags,
                description : description,
                relase_date : moment(relase_date).format("YYYY-MM-DD"),
                excrept : excrept,
                meta_title : meta_title,
                meta_tags : meta_tags,
                meta_description : meta_description,
                visited_count : parseInt(visited_count),
                tiny_url : tiny_url,
                flag : flag,
                users_id : parseInt(users_id),
                author_id : parseInt(author_id),
                media_id : parseInt(media_id),
                category : category
            }
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}


//  BLOG READ
export const BlogRead = async (req = request, res = response) => {
    try {
        const { page = 1, limit = 10 } = await req.query
        let skip = await (page - 1) * limit
        const { filter } = await req.body
        const result = await BlogModels.findMany({
            skip : parseInt(skip),
            take : parseInt(limit),
            orderBy : { id : "desc" },
            where : filter,
        })

        const conn = await BlogModels.count()

        res.status(200).json({
            success : true,
            current_page : parseInt(page),
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


//      BLOG UPDATE
export const BlogUpdate = async (req = request, res = response) => {
    try {
        const { id } = await req.params
        const data = await req.body
        const checkUniqueId = await BlogModels.findFirst({
            where : {
                id : parseInt(id)
            }
        })

        const checkUniqueAuthorId = await BlogModels.findFirst({
            where : {
                author_id : parseInt(data.author_id)
            }
        })

        const checkUniqueMediaId = await BlogModels.findFirst({
            where : {
                media_id : parseInt(data.media_id)
            }
        })

        if (!checkUniqueId) {
            return res.status(404).json({
                success : false,
                msg : "Id not found!"
            })
        }

        if (!checkUniqueAuthorId) {
            return res.status(400).json({
                success : false,
                msg : "Author id not found!"
            })
        }

        if (!checkUniqueMediaId) {
            return res.status(400).json({
                success : false,
                msg : "Media id not found!"
            })
        }

        const result = await BlogModels.update({
            where : {
                id : parseInt(id)
            },
            data : {
                title : data.title,
                slug : data.slug,
                tags : data.tags,
                description : data.description,
                relase_date : moment(data.relase_date).format("YYYY-MM-DD"),
                excrept : data.excrept,
                meta_title : data.meta_title,
                meta_tags : data.meta_tags,
                meta_description : data.meta_description,
                visited_count : parseInt(data.visited_count),
                tiny_url : data.tiny_url,
                flag : data.flag,
                users_id : parseInt(data.users_id),
                author_id : parseInt(data.author_id),
                media_id : parseInt(data.media_id),
                category : data.category
            }
        })


        res.status(200).json({
            success : true,
            msg : "Data has been updated!",
        })


    } catch (error) {
        res.status(500).json({
            success : false,
            error :error.message
        })
    }
}


//      BLOG DELETE
export const BlogDelete = async (req = request, res = response) => {
    try {
        const { id } = await req.params
        const checkUniqueId = await BlogModels.findFirst({
            where : {
                id : parseInt(id)
            }
        })

        if (!checkUniqueId) {
            return res.status(404).json({
                success : false,
                msg : "Id not found!"
            })
        }

        const result = await BlogModels.delete({
            where : {
                id : parseInt(id)
            }
        })

        res.status(200).json({
            success : true,
            msg : "Data has been deleted!",
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error :error.message
        })
    }
}