import { json, request, response } from "express"
import { AddressModels } from "../models/Models"


//    ADDRESS CREATE
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

        const result = await AddressModels.create({
            data : {
                nama_lengkap : nama_lengkap,
                biodata_id : parseInt(biodata_id)
            }
        })

        res.status(201).json({
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

//  ADDRESS READ ALL
export const AddressRead = async (req = request, res = response) => {
    try {
        const { page = 1, limit = 10 } = await req.query
        let skip = (page - 1) * limit
        const { filter } = await req.body
        const result = await AddressModels.findMany({
            skip: parseInt(skip),
            take: parseInt(limit),
            orderBy: { id: "desc" },
            where: filter,
        })

        const conn = await AddressModels.count()

        res.status(200).json({
			success: true,
			current_page: parseInt(page),
			total_page: Math.ceil(conn / limit),
			total_data: conn,
			query: result,
		})

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}

//  ADDRESS UPDATE
export const AddressUpdate = async (req = request, res = response) => {
    try {
        
        const data = await req.body
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

        const result = await AddressModels.update({
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


//      ADDRESS DELETE
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

        const result = await AddressModels.delete({
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