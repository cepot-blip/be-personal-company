import { request, response } from "express"
import bcrypt from "bcryptjs"
import { UsersModels } from "../../../models/Models"

const salt = bcrypt.genSaltSync(10)


export const UsersChangePassword = async (req = request, res = response) => {
	try {
		const { oldPassword, newPassword, email } = await req.body
		const findUsers = UsersModels.findUnique({
			where: {
				email: email,
			},
		})

		if (!findUsers) {
            return res.status(401).json({
				success: false,
				msg: "Email Not Found!",
			})

		}

		const compareOldPassword = await bcrypt.compareSync(oldPassword, findUsers.password)
		if (!compareOldPassword) {
			return res.status(401).json({
				success: false,
				msg: "Wrong old password",
			})
		}

		const hashNewPassword = await bcrypt.hashSync(newPassword, salt)
		await UsersModels.update({
			where: {
				email: email,
			},
			data: {
				password: hashNewPassword,
			},
		})

		res.status(200).json({
			success: true,
			msg: "Successfully changed password!",
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message,
		})
	}
}