import { request, response } from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import env from "dotenv"
import cryptoJs from "crypto-js"
import { UsersModels } from "../models/Models"
env.config()

const salt = bcrypt.genSaltSync(10)

//      USERS CREATE
export const UsersCreate= async (req = request, res = response) => {
    try {
        const {email, password, role} = await req.body

        //      VALIDASI EMAIL
        const checkUniqueEmail = await UsersModels.findUnique({
            where : {
                email : email
            }
        })

        if (checkUniqueEmail) {
            return res.status(401).json({
                status : false,
                message : "Email already exist"
            })
        }

        const createUsers = await UsersModels.create({
            data : {
                email : email,
                password : bcrypt.hashSync(password, salt),
				role : role,
                token : token
            }
        })

        const token = await jwt.sign(
            {
                app_name : process.env.APP_NAME,
                id : createUsers.id,
                email : createUsers.email,
				role : createUsers.role
            },
            process.env.API_SECRET,
        )

        res.status(201).json({
            success : true,
            msg : "Successfuly created users!",
            token : token
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}


//      USERS LOGIN
export const UsersLogin = async (req = request, res = response) => {
    try {
        const {email, password} = await req.body

        const UsersCheck = await UsersModels.findUnique({
            where : {
                email : email
            }
        })

        if (!UsersCheck) {
            return res.status(401).json({
                status : false,
                message : "Email not found!"
            })
        }

        const comparePassword = await bcrypt.compareSync(password, UsersCheck.password)
        const token = await jwt.sign(
            {
                app_name : process.env.APP_NAME,
                id : UsersCheck.id,
                email : UsersCheck.email
            },
            process.env.API_SECRET,
            {
                expiresIn : "1d"
            }
        )

        if (!comparePassword) {
            return res.status(401).json({
                status : false,
                message : "Password not match!"
            })
        }

        const hashToken = await cryptoJs.AES.encrypt(token, process.env.API_SECRET).toString()
        res.setHeader("Access-Controll-Allow-Origin", "*")
        res.status(201).json({
            success : true,
            token : hashToken
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })
    }
}


//      READ ALL USERS
export const UsersReadAll = async (req = request, res = response) => {
    try {
        const { page = 1, limit = 10 } = await req.query
		let skip = (page - 1) * limit
		const { filter } = await req.body
		const result = await UsersModels.findMany({
            skip: parseInt(skip),
			take: parseInt(limit),
			orderBy: { id: "desc" },
			where: filter,
			include : {
				Avatar : {
					select : {
						id : true,
						location : true
					}
				}
			}
        })
		
        const conn = await UsersModels.count()

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

//      UPDATE USERS
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
			return res.status(400).json({
				success: false,
				message: 'Email already exist!',
			})
		}


		const result = await UsersModels.update({
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


//      DELETE USERS
export const UsersDelete = async (req = request, res = response) => {
    try {
		const { id } = await req.body

		const checkId = await UsersModels.findFirst({
			where: {
				id: parseInt(id),
			}
		})

		if (!checkId) {
			return res.status(404).json({
				success: false,
				message: 'Id not found!',
			})
		}

		const result = await UsersModels.delete({
			where: {
				id: parseInt(id),
			},
		})

		res.status(201).json({
			success: true,
			msg: "Successfully delete users!",
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message,
		})
	}
}

//      USERS VALIDATE
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
			msg: "Authorization Users",
			query: jwt.decode(decryptToken),
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message,
		})
	}
}

//      USERS CHANGE PASSWORD
export const UsersChangePassword = async (req = request, res = response) => {
	try {
		const { oldPassword, newPassword, email } = await req.body
		const findUsers = UsersModels.findUnique({
			where: {
				email: email,
			},
		})

		if (!findUsers) {
			res.status(401).json({
				success: false,
				msg: "Email Not Found!",
			})
			return
		}

		const compareOldPassword = await bcryptjs.compareSync(oldPassword, findUsers.password)
		if (!compareOldPassword) {
			res.status(401).json({
				success: false,
				msg: "Wrong old password",
			})
			return
		}

		const hashNewPassword = await bcryptjs.hashSync(newPassword, salt)
		const updatePassword = await UsersModels.update({
			where: {
				email: email,
			},
			data: {
				password: hashNewPassword,
			},
		})

		res.status(201).json({
			success: true,
			msg: "Successfully changed password",
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			error: error.message,
		})
	}
}