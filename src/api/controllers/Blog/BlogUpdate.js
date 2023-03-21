import { response, request } from "express";
import { BlogModels } from "../../../models/Models";
import moment from "moment";


export const BlogUpdate = async (req = request, res = response) => {
    try {
        const { id } = await req.params
        const data = await req.body
        const checkUniqueId = await BlogModels.findUnique({
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

        await BlogModels.update({
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
            msg : "Successfully update blog!",
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error :error.message
        })
    }
}