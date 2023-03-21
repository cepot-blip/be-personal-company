import { response, request } from "express"
import { AuthorModels } from "../../../models/Models"


export const AuthorCreate = async (req = request, res = response) => {
    try {
        const {
            name,
            avatar_id
        } = await req.body

        await AuthorModels.create({
            data : {
                name : name,
                avatar_id: parseInt(avatar_id),
            }
        })

        res.status(200).json({
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
