import { AvatarModels } from "../../../models/Models"
import { response, request } from "express"


export const AvatarUpdate = async (req = request, res = response) => {
	try {
		const { id } = await req.params
		const data = await req.body
        const checkUniqueId = await AvatarModels.findUnique({
            where : {
                id : parseInt(id)
            }
        })

		const checkUniqueUsersId = await AvatarModels.findFirst({
			where: {
				users_id: parseInt(checkUniqueId.users_id),
			}
		})

		if (checkUniqueUsersId) {
			return res.status(400).json({
				success: false,
				msg: "Users id not found!",
			})
		}

        if(!checkUniqueId){
            return res.status(400).json({
                success : false,
                msg : "Id not found!"
            })
        }

		await AvatarModels.update({
			where: {
				id: parseInt(id),
			},
			data : {
				images : data.images,
				users_id : parseInt(data.users_id)
			}
		})

		res.status(200).json({
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