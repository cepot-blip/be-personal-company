import { request, response } from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import env from "dotenv"
import cryptoJs from "crypto-js"
import { UsersModels } from "../../../models/Models"
env.config()

const salt = bcrypt.genSaltSync(10)


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

        const comparePassword = await bcrypt.compareSync(password, UsersCheck.password, salt)
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