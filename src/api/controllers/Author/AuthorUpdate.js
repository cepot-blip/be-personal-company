import { response, request } from "express"
import { AuthorModels } from "../../../models/Models"


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

        await AuthorModels.update({
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