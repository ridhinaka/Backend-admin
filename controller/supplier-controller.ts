import {Request,Response,NextFunction} from 'express'
import {Supplier} from '../models/Supplier'
import {User} from '../models/Users'

class supplierController {

  static async getSupplier (req: Request, res: Response){

    const findAllSupplier = await Supplier.find({})
    res.status(200).json({data:findAllSupplier})
  }

  static async createSupplier (req : Request, res: Response){
    const findUser = await User.findById((<any>req).Id)

    try{
      if(findUser?.role === "inventory"){
        const newSupplier = {
          supplierName : req.body.supplierName,
          email : req.body.email,
          phone : req.body.phone,
          gender : req.body.gender,
          address : {
            street : req.body.street,
            city : req.body.city,
            state: req.body.state,
            country : req.body.country,
            postalCode : req.body.postalCode,
            addressDetail : req.body.addressDetail
          }
        }
        const create_supplier = await Supplier.create(newSupplier)
        const updateSupplier = await Supplier.findByIdAndUpdate(create_supplier._id,{$set:{inventory_id:findUser._id}},{new:true})
        res.status(201).json({msg: "your supplier have been created",data :updateSupplier})
      }else{
        res.status(500).json({msg: "you are not allowed to create supplier"})
      }
    }
    catch(error){
      res.status(500).json({msg:"your supplier already exist"})
    }
  }
}

export default supplierController