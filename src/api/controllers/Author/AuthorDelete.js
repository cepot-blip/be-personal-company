import { response, request } from "express"
import { AuthorModels } from "../../../models/Models"


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

        await AuthorModels.delete({
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