import e, {Request,Response,NextFunction} from 'express'
import {Payable} from '../models/Payable'
import { User } from "../models/Users";

class payableController {
  static async getPayable (req:Request, res:Response){
    const findUser = await User.findById((<any>req).Id)
    if(findUser.role === "owner" || "finance"){
      const findPayable = await Payable.find({}).populate('supplier_id').populate('id_invoice')
      res.status(200).json({data:findPayable})
    }else{
      res.status(500).json({msg:"you are now allowed"})
    }
  }
}

export default payableController
