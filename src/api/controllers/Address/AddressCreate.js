import { response, request } from "express"
import { AddressModels } from "../../../models/Models"


export const AddressCreate = async (req = request, res = response) => {
    try {
        const {
            nama_lengkap,
            biodata_id
        } = await req.body

        const checkUniqueId = await AddressModels.findFirst({
            where : {
                biodata_id : parseInt(biodata_id)
            }
        })

        if (!checkUniqueId) {
            return res.status(400).json({
                success : false,
                msg : "Biodata id not found!"
            })
        }

        await AddressModels.create({
            data : {
                nama_lengkap : nama_lengkap,
                biodata_id : parseInt(biodata_id)
            }
        })

        res.status(200).json({
            success : true,
            msg : "Successfully create address!"
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}