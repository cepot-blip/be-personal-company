import { request, response } from "express"
import { BiodataModels } from "../models/Models"


//      BIODATA CREATE
export const BiodataCreate = async (req = request, res = response) => {
    try {
        const {
           email,
           phone,
           nama_lengkap,
           avatar_id
        } = await req.body

        const checkUniqueId = await BiodataModels.findFirst({
            where : {
                avatar_id : parseInt(avatar_id)
            }
        })

        if (!checkUniqueId) {
            return res.status(400).json({
                success : false,
                msg : "Avatar id not found!"
            })
        }

        const result = await BiodataModels.create({
            data : {
                email : email,
                avatar_id: parseInt(avatar_id),
                phone : phone,
                nama_lengkap : nama_lengkap
            }
        })

        res.status(201).json({
            success : true,
            msg : "Successfully create biodata!"
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}


//      BIODATA READ ALL
export const BiodataRead = async (req = request, res = response) => {
    try {
        const { page = 1, limit = 10 } = await req.query
		let skip = (page - 1) * limit
		const { filter } = await req.body
		const result = await BiodataModels.findMany({
            skip: parseInt(skip),
			take: parseInt(limit),
			orderBy: { id: "desc" },
			where: filter,
        })

        const conn = await BiodataModels.count()

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

//      BIODATA UPDATE
export const BiodataUpdate = async (req = request, res = response) => {
    try {
        const data = await req.body
        const { id } = await req.params
        const  checkUniqueId = await BiodataModels.findUnique({
            where : {
                id : parseInt(id)
            }
        })

        if (!checkUniqueId) {
            return res.status(404).json({
                success : false,
                msg : "Id not found!"
            })
        }

        const result = await BiodataModels.update({
            where : {
                id : parseInt(id)
            },
            data : {
                email : data.email,
                phone : data.phone,
                nama_lengkap : data.nama_lengkap,
                avatar_id : parseInt(data.avatar_id)
            }
        })

        res.status(200).json({
            success : true,
            msg : "Successfully update biodata!"
        })
    
    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}


//      BIODATA DELETE
export const BiodataDelete = async (req = request, res = response) => {
    try {
        const { id } = await req.params
        const checkUniqueId = await BiodataModels.findUnique({
            where : {
                id : parseInt(id)
            }
        })

        if (!checkUniqueId) {
            return res.status(404).json({
                success : false,
                msg : "Id not found!"
            })
        }

        const result = await BiodataModels.delete({
            where : {
                id : parseInt(id)
            }
        })

        res.status(200).json({
            success : true,
            msg : "Successfully delete biodata!"
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}