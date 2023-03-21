import { response, request } from "express";
import { BlogModels } from "../../../models/Models";
import moment from "moment";


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

        await BlogModels.create({
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
