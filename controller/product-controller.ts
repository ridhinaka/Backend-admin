import {User} from '../models/Users'
import {Request,Response,NextFunction} from 'express'
import {Product} from '../models/Product'
import { Brand } from '../models/Brand'
import {UOM} from '../models/UOM'
class productsController {
  constructor (){}
  static async getProduct (req: Request , res: Response) {
    try{
      const findProduct = await Product.find({})
      res.status(200).json({data:findProduct})
    }
    catch(error){
      res.status(500).json({msg:error})
    }
  }

  static async createProduct (req: Request , res: Response) {
    const {id} = req.params
    const {brand_id,UOM_id} = req.body
    try{
      const findUser = await User.findById((<any>req).Id)
      if(findUser.role === "inventory"){
        const newProduct = {
          brand_id,
          UOM_id,
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
            const findBYID = await Product.findById(create_product._id)
            .populate('brand_id')
            .populate('UOM_id')
            res.status(201).json({msg:findBYID})
          }else{
            res.status(500).json({msg: "barcode already exist"})
          }
        }else if(findProduct){
          const finOne = await Product.findOne({code_product:req.body.code_product})
          if((finOne.productName === req.body.productName) && ((finOne.UOM_id).toString() === req.body.UOM_id) && (finOne.code_product === parseInt(req.body.code_product))){
            res.status(500).json({msg: "product already exist"})
          }else{
            const create_product = await Product.create(newProduct)
            res.status(201).json({msg:create_product})
          }
        }  
      }
    }
    catch(error){
      res.status(500).json({msg: "cannot create product",data:error})
    }
  }

  static async changeStatusProductActive (req: Request , res: Response) {
    const {id} = req.params
    const findProduct = await Product.findById(id)

    try {
      if(findProduct.productStatus === "deactive"){
        const updateActiveProduct = await Product.findByIdAndUpdate(id,{$set:{productStatus:"active"}},{new:true})
        res.status(200).json({msg:updateActiveProduct})
      }else if(findProduct.productStatus === "active"){
        const updateActiveProduct = await Product.findByIdAndUpdate(id,{$set:{productStatus:"deactive"}},{new:true})
        res.status(200).json({msg:updateActiveProduct})
      }else{
        res.status(500).json({msg:"your product doesnt exist"})
      }
    } catch (error) {
      res.status(500).json({msg:error})
    }
  }

  static async changeStatusProductDeactive (req: Request , res: Response) {
    const {id} = req.params
    const findProduct = await Product.findById(id)

    try {
      if(findProduct){
        const updateDeactiveProduct = await Product.findByIdAndUpdate(id,{$set:{productStatus:"deactive"}},{new:true})
        res.status(200).json({msg:updateDeactiveProduct})
      }else{
        res.status(500).json({msg:"your product doesnt exist"})
      }
    } catch (error) {
      res.status(500).json({msg:error})
    }
  }
}

export default productsController