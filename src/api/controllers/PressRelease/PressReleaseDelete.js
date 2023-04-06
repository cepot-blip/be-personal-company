import { response, request } from "express";
import { PressReleaseModels } from "../../../models/Models";


export const PressReleaseDelete = async (req = request, res = response) => {
    try {
        const { id } = await req.params
        const checkUniqueId = await PressReleaseModels.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if(!checkUniqueId){
            return res.status(400).json({
                status: false,
                message: 'Id not found!'
            })
        }

        await PressReleaseModels.delete({
            where: {
                id: parseInt(id)
            }
        })

        return res.status(200).json({
            status: true,
            message: 'Successfully delete press release!'
        })

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}