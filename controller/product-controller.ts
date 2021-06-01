import {User} from '../models/Users'
import {Request,Response,NextFunction} from 'express'
import {Product} from '../models/Product'
import {Brand} from '../models/Brand'
import { AnyObject } from 'mongoose'

class productsController {
  constructor (){}
  static async createProduct (req: Request , res: Response) {
    const {id} = req.params
    
    try{
      const findUser = await User.findById((<any>req).Id)
      if(findUser.role === "inventory"){
        const newProduct = {
          UOM_id : req.body.UOM_id,
          productName : req.body.productName,
          productImage : req.body.productImage,
          sellingPrice : req.body.sellingPrice,
          purchasePrice : req.body.purchasePrice,
          code_product : req.body.code_product
        }

        const findBarcode = await Product.findOne({code_product:req.body.code_product})
        const findProduct = await Product.find({productName:req.body.productName,UOM_id:req.body.UOM_id})
        if(findProduct.toString() === ""){
          if(!findBarcode){
            const create_product = await Product.create(newProduct)
            res.status(200).json({msg:create_product})
          }else{
            res.status(500).json({msg: "barcode already exist"})
          }
        }else if(findProduct){
          const finOne = await Product.findOne({code_product:req.body.code_product})
          if((finOne.productName === req.body.productName) && ((finOne.UOM_id).toString() === req.body.UOM_id) && (finOne.code_product === parseInt(req.body.code_product))){
            res.status(500).json({msg: "product already exist"})
          }else{
            const create_product = await Product.create(newProduct)
            res.status(200).json({msg:create_product})
          }
        }  
      }
    }
    catch(error){
      res.status(500).json({msg: "cannot create product",data:error})
    }
  }
}

export default productsController