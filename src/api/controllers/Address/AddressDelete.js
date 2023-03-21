import { response, request } from "express"
import { AddressModels } from "../../../models/Models"


export const AddressDelete = async (req = request, res = response) => {
    try {
        const { id } = await req.params

        const checkUniqueId = await AddressModels.findFirst({
            where : {
                id : parseInt(id)
            }
        })

        if (!checkUniqueId) {
            return res.status(400).json({
                success : false,
                msg : "Id not found!"
            })
        }

        await AddressModels.delete({
            where : {
                id : parseInt(id)
            }
        })

        res.status(200).json({
            success : true,
            msg : "Successfully delete address!"
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}