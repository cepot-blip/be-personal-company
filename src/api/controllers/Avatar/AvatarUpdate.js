import { AvatarModels } from "../../../models/Models"
import { response, request } from "express"
import path from "path"
import fs from "fs"


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
			await AvatarModels.update({
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
			await fs.unlinkSync(
				path.join(__dirname, `../../static/public/uploads/avatar/${findAvatar.filename}`)
			)

		} else {
			await AvatarModels.update({
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