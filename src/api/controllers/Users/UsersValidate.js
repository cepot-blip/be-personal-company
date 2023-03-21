import { request, response } from "express"
import jwt from "jsonwebtoken"
import env from "dotenv"
import cryptoJs from "crypto-js"
env.config()


export const UsersValidate = async (req = request, res = response) => {
	try {
		const { token } = await req.body
		const decryptToken = await cryptoJs.AES.decrypt(token, process.env.API_SECRET).toString(cryptoJs.enc.Utf8)
		const verify = await jwt.verify(decryptToken, process.env.API_SECRET)

		if (!verify) {
			res.status(401).json({
				success: false,
				msg: "Users has expired, Please Login Again!",
			})
			return
		}

		res.status(201).json({
			success: true,
			msg: "Authorization Users!",
			query: jwt.decode(decryptToken),
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message,
		})
	}
}