import { response, request } from "express";
import { PressReleaseModels } from "../../../models/Models";
import moment from "moment";


export const PressReleaseCreate = async (req = request, res = response) => {
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
            flag,
            users_id,
            author_id,
            media_id,
            category_id,
        } = await req.body

        const checkUniqueUsersId = await PressReleaseModels.findFirst({
            where: {
                users_id: parseInt(users_id)
            }
        })

        const checkUniqueAuthorId = await PressReleaseModels.findFirst({
            where: {
                author_id: parseInt(author_id)
            }
        })

        const checkUniqueMediaId = await PressReleaseModels.findFirst({
            where: {
                media_id: parseInt(media_id)
            }
        })

        const checkUniqueCategoryId = await PressReleaseModels.findFirst({
            where: {
                category_id: parseInt(category_id)
            }
        })

        if(checkUniqueUsersId){
            return res.status(400).json({
                status: false,
                message: 'Users Id not found!'
            })
        }

        if(checkUniqueAuthorId){
            return res.status(400).json({
                status: false,
                message: 'Author Id not found!'
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


        await PressReleaseModels.create({
            data: {
                title : title,
                slug : slug,
                tags : tags,
                description : description,
                relase_date : moment(relase_date).format('YYYY-MM-DD').toString(),
                excrept : excrept,
                meta_title : meta_title,
                meta_tags : meta_tags,
                meta_description : meta_description,
                visited_count : parseInt(visited_count),
                flag : flag,
                users_id : parseInt(users_id),
                author_id : parseInt(author_id),
                media_id : parseInt(media_id),
                category_id : parseInt(category_id),
            }
        })

        return res.status(200).json({
            status: true,
            message: 'Press Release Created Successfully!'
        })

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}