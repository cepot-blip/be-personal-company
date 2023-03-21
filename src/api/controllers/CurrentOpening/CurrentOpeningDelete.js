import { request, response } from "express"
import { CurrentOpeningModels } from "../../../models/Models"


export const CurrentOpeningDelete = async (req = request, res = response) => {
    try {
        const { id } = await req.params
        const checkUniqueId = await CurrentOpeningModels.findUnique({
            where : {
                id : parseInt(id)
            }
        })

        if(!checkUniqueId){
            return res.status(404).json({
                success : false,
                msg : "Current opening id not found!"
            })
        }

        await CurrentOpeningModels.delete({
            where : {
                id : parseInt(id)
            }
        })

        res.status(200).json({
            success : true,
            msg : "Succesfully delete current opening!"
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            error : error.message
        })   
    }
}