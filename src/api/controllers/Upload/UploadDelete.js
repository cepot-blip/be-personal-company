import { request, response } from "express"
import { ref, deleteObject } from "firebase/storage";
import { storage } from "../../utils/firebase";

/**
 * @function UploaderDelete ini digunakan untuk menghapus file dari firebase storage
 * @function storageRef ini digunakan untuk menampung data base64 yang telah dipotong menggunakan split untuk mendapatkan ekstensi file
 * @function deleteStorage ini digunakan untuk delete object dari firebase storage 
 * @param req ini adalah request dari client
 * @param res ini adalah response dari server
 * 
 * @author cepot-blip
 */


export const UploaderDelete = async (req = request, res = response) => {
    try {
        const { filename } = await req.body
        const storageRef = await ref(storage, `/uploads/${filename}`)
        const deleteStorage = await deleteObject(storageRef)
        return res.status(201).json({
            success: true,
            message: "Berhasil delete object"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error
        })
    }
}