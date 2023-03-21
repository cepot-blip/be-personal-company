import { request, response } from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import env from "dotenv"
import { UsersModels } from "../../../models/Models"
env.config()

const salt = bcrypt.genSaltSync(10)

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



