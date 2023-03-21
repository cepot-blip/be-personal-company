import { AvatarModels } from "../../../models/Models"
import { response, request } from "express"
import path from "path"
import fs from "fs"


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
		await fs.unlinkSync(
			path.join(__dirname, `../../static/public/uploads/avatar/${result.filename}`)
		)

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