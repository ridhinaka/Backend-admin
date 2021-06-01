import {Request,Response,NextFunction} from 'express'
import {Purchase} from '../models/PurchaseOrder'
import {Supplier} from '../models/Supplier'
import {User} from '../models/Users'
import {Product} from '../models/Product'

class purchaseController {
  constructor (){}

  static async getPurchase (req: Request , res: Response) {
    const findPurchaseOrder = await Purchase.find({})
    res.status(200).json({msg:findPurchaseOrder})
  }

  static async createPurchaseOrder (req: Request , res: Response) {
    const {id} = req.params
    const {product_id,quantity,discount} = req.body
    const findProduct = await Product.findById(product_id)

    try {
      const findUser = await User.findById((<any>req).Id)
      if(findUser.role === "inventory"){
        const findIdSupplier = await Purchase.findOne({supplier_id:id})
        if(!findIdSupplier){
          const newPurchaseOrder = {
            product_id : product_id,
            codeOrder : req.body.codeOrder,
            quantity : quantity,
            discount : discount,
            totalOrder : (findProduct.purchasePrice * quantity) - discount
          }
          const create_purchaseOrder = await Purchase.create(newPurchaseOrder)
          const findSupplier = await Supplier.findById(id)
          const updateNewPO = await Purchase.findByIdAndUpdate(create_purchaseOrder._id,{$set:{supplier_id:findSupplier._id}},{new:true})
          res.status(200).json({msg:"your PO have been created",data:updateNewPO})
        }else{
          const findIdSupplierUpdate = await Purchase.findOneAndUpdate({supplier_id:id},{$push:{product_id:product_id},$inc:{totalOrder:(findProduct.purchasePrice * quantity) - discount}},{new:true})
          res.status(200).json({msg:"your PO have been created",data:findIdSupplierUpdate})
        }
      }else{
        res.status(500).json({msg: "you are not allowed to create PO"})
      }
    } catch (error) {
      res.status(500).json({msg: "cannot create PO",data:error})
    }
  }
}

export default purchaseController