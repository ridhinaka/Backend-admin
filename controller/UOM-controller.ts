import {Request,Response,NextFunction} from 'express'
import {UOM} from '../models/UOM'
import {User} from '../models/Users'

class UOMcontroller {
  constructor (){}
  static async getUOM (req: Request , res: Response) {
    try{
      const findUOM = await UOM.find({})
      res.status(200).json({data:findUOM})
    }
    catch(error){
      res.status(500).json({msg:error})
    }
  }

  static async createUOM (req :Request, res: Response){
    try {
      const findUser = await User.findById((<any>req).Id)
      if(findUser.role === "inventory"){
        const newUOM = {
          UOM_name : req.body.UOM_name
        }
        const create_UOM = await UOM.create(newUOM)
        res.status(201).json({msg:"unit of measure have been created",data:create_UOM})
      }else{
        res.status(500).json({msg:"you are not allowed to create unit of measure"})
      }
    } catch (error) {
      res.status(500).json({msg:error})
    }
  }
}

export default UOMcontroller