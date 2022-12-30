import { response, request } from "express"
import path from "path"
import fs from "fs"
import { AvatarModels } from "../models/Models"


//      AVATAR CREATE
export const AvatarCreate = async (req = request, res = response) => {
    try {
        const file = await req.file
        const data = await req.body
        const storeAvatar = await AvatarModels.create({
            data : {
                filename : file.filename,
                location : `public/uploads/avatar/${file.filename}`,
                users_id : parseInt(data.users_id)
            }
        })

        if(!storeAvatar){
           return res.status(401).json({
                success : false,
                msg : "Failed to create avatar!"
            })
        }

        res.status(201).json({
            success : true,
            msg : "Successfully create avatar!"
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}


//      AVATAR READ ALL 
export const AvatarRead = async (req = request, res = response) => {
    try {
        const { page = 1, limit = 10 } = await req.query
        let skip = (page - 1) * limit
        const { filter } = await req.body
        const result = await AvatarModels.findMany({
            skip: parseInt(skip),
            take: parseInt(limit),
            orderBy: { id: "desc" },
            where : filter,
        })

        const conn = await AvatarModels.count()

        res.status(200).json({
            success : true,
            current_page: parseInt(page),
            total_page : Math.ceil(conn / limit),
            total_data : conn,
            query : result
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}


//      AVATAR UPDATE
export const AvatarUpdate = async (req = request, res = response) => {
	try {
		const data = await req.body
		const { id } = await req.params
		const file = await req.file
        const checkUniqueId = await AvatarModels.findFirst({
            where : {
                id : parseInt(id)
            }
        })
		const findAvatar = await AvatarModels.findUnique({
			where: {
				id: parseInt(id),
			},
		})

        if(!checkUniqueId){
            return res.status(401).json({
                success : false,
                msg : "Id not found!"
            })
        }

		if (file){
			const storeAvatar = await AvatarModels.update({
				where: {
					id: parseInt(id),
				},
				data: {
					filename: file.filename,
					location: `/public/uploads/avatar/${file.filename}`,
					users_id: parseInt(data.users_id),
				},
			})

			//      DELETE AVATAR FROM SERVER
			const deleteAvatarFromServer = await fs.unlinkSync(
				path.join(__dirname, `../../static/public/uploads/avatar/${findAvatar.filename}`)
			)

		} else {
			const storeAvatar = await AvatarModels.update({
				where : {
					id: parseInt(id),
				},
				data : {
					users_id: parseInt(data.users_id),
				}
			})
		}

		res.status(201).json({
			success: true,
			msg: "Successfully update avatar!",
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message,
		})
	}
}



//      AVATAR DELETE
export const AvatarDelete = async (req = request, res = response) => {
	try {
		const { id } = await req.body
		const result = await AvatarModels.delete({
			where: {
				id: parseInt(id),
			},
		})

		if (!result) {
			res.status(401).json({
				success: false,
				msg: "Data not found!",
			})
			return
		}

		//      DELETE AVATAR FROM SERVER
		const deleteAvatar = await fs.unlinkSync(
			path.join(__dirname, `../../static/public/uploads/avatar/${result.filename}`)
		)

		res.status(201).json({
			success: true,
			msg: "Successfully delete avatar!",
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message,
		})
	}
}

