import { response, request } from "express";
import { PressReleaseModels } from "../../../models/Models";


export const PressReleaseReadById = async (req = request, res = response) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const filter = req.body.filter ?? {};
        const result = await PressReleaseModels.findUnique({
          skip: skip,
          take: limit,
          orderBy: { id: 'desc' },
          where: {
            id: parseInt(req.params.id),
            filter,
          }
        });
    
        const conn = await PressReleaseModels.count();
    
        const totalPage = Math.ceil(conn / limit);
    
        res.status(200).json({
          success: true,
          current_page: page,
          total_page: totalPage,
          total_data: conn,
          query: result
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          error: error.message
        });
      }
}
