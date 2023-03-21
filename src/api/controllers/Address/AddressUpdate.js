import { response, request } from "express"
import { AddressModels } from "../../../models/Models"


export const AddressUpdate = async (req = request, res = response) => {
    try {
        const data = await req.body
        const { id } = await req.params
        const checkUniqueId = await AddressModels.findUnique({
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

        await AddressModels.update({
            where : {
                id : parseInt(id)
            },
            data : {
                nama_lengkap : data.nama_lengkap,
                biodata_id : parseInt(data.biodata_id)
            }
        })

        res.status(200).json({
            success : true,
            msg : "Successfully update address!"
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}
