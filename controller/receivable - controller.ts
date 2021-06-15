import {Request,Response,NextFunction} from 'express'
import {User} from '../models/Users'
import {Receivable} from '../models/Receivable'

class receivableController {
  static async getAllReceivable (res:Response, req:Request){
    const findAlReceivable = await Receivable.find({})
    .populate('orderCashier_id')
    res.status(200).json({msg:findAlReceivable})
  }
}

export default receivableController