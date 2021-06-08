import {Request,Response,NextFunction} from 'express'
import {Brand} from '../models/Brand'
import {User} from '../models/Users'

class brandContoller {
  static async getBrand (req: Request , res: Response) {
    try{
      const findBrand = await Brand.find({})
      res.status(200).json({data:findBrand})
    }
    catch(error){
      res.status(500).json({msg:error})
    }
  }
  static async createBrand (req:Request, res: Response){
    const findUser = await User.findById((<any>req).Id)
    try {
      if(findUser.role === "inventory"){
        const newBrand = {
          brandName : req.body.brandName
        }
        const create_brand = await Brand.create(newBrand)
        res.status(201).json({msg: "your brand have been created",data: create_brand})
      }else{
        res.status(500).json({msg: "you are not allowed to create brand"})
      }
    } catch (error) {
      res.status(500).json({msg:"your brand already exist"})
    }
  }
}

export default brandContoller