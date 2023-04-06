import { AvatarModels } from "../../../models/Models"
import { response, request } from "express"


export const AvatarDelete = async (req = request, res = response) => {
	try {
		const { id } = await req.body
		const checkUniqueId = await AvatarModels.findUnique({
			where: {
				id: parseInt(id),
			}
		})

		if (!checkUniqueId) {
			return res.status(400).json({
				success: false,
				msg: "Avatar id not found!",
			})
		}

		await AvatarModels.delete({
			where: {
				id: parseInt(id),
			},
		})


		res.status(200).json({
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