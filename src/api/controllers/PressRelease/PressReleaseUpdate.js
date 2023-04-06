import { response, request } from "express";
import { PressReleaseModels } from "../../../models/Models";
import moment from "moment";


export const PressReleaseUpdate = async (req = request, res = response) => {
    try {
        const { id } = await req.params
        const data = await req.body

        const checkUniqueId = await PressReleaseModels.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        const checkUniqueAuthorId = await PressReleaseModels.findFirst({
            where: {
                author_id: parseInt(data.author_id)
            }
        })

        const checkUniqueUsersId = await PressReleaseModels.findFirst({
            where: {
                users_id: parseInt(data.users_id)
            }
        })

        const checkUniqueMediaId = await PressReleaseModels.findFirst({
            where: {
                media_id: parseInt(data.media_id)
            }
        })

        const checkUniqueCategoryId = await PressReleaseModels.findFirst({
            where: {
                category_id: parseInt(data.category_id)
            }
        })

        if(!checkUniqueId){
            return res.status(400).json({
                status: false,
                message: 'Id not found!'
            })
        }

        if(checkUniqueAuthorId){
            return res.status(400).json({
                status: false,
                message: 'Author Id not found!'
            })
        }

        if(checkUniqueUsersId){
            return res.status(400).json({
                status: false,
                message: 'Users Id not found!'
            })
        }

        if(checkUniqueMediaId){
            return res.status(400).json({
                status: false,
                message: 'Media Id not found!'
            })
        }

        if(checkUniqueCategoryId){
            return res.status(400).json({
                status: false,
                message: 'Category Id not found!'
            })
        }

        await PressReleaseModels.update({
            where: {
                id: parseInt(id)
            },
            data : {
                title : data.title,
                slug : data.slug,
                tags : data.tags,
                description : data.description,
                relase_date : moment(data.relase_date).format('YYYY-MM-DD').toString(),
                excrept : data.excrept,
                meta_title : data.meta_title,
                meta_tags : data.meta_tags,
                meta_description : data.meta_description,
                visited_count : parseInt(data.visited_count),
                flag : data.flag,
                users_id : parseInt(data.users_id),
                author_id : parseInt(data.author_id),
                media_id : parseInt(data.media_id),
                category_id : parseInt(data.category_id),
            }
        })

        res.status(200).json({
            status: true,
            message: 'Successfully update press release!'
        })

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })   
    }
}