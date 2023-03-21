import { request, response } from "express"
import { UsersModels } from "../../../models/Models"


export const UsersUpdate = async (req = request, res = response) => {
    try {
		const data = await req.body
		const checkUniqueId = await UsersModels.findUnique({
			where: {
				id: data.id,
			}
		})

		const checkUniqueEmail = await UsersModels.findUnique({
			where: {
				email: data.email,
			}
		})

		if (!checkUniqueId) {
			return res.status(404).json({
				success: false,
				message: 'Id not found!',
			})
		}
		
		if (checkUniqueEmail) {
			return res.status(404).json({
				success: false,
				message: 'Email already exist!',
			})
		}


		await UsersModels.update({
			where: {
				id: parseInt(data.id),
			},
			data: {
				email: data.email,
				password: data.password,
			},
		})

		res.status(201).json({
			success: true,
			msg: "Successfully update users!",
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message,
		})
	}
}