import {Request,Response,NextFunction} from 'express'
import {Purchase} from '../models/PurchaseOrder'
import {Supplier} from '../models/Supplier'
import {User} from '../models/Users'
import {Product} from '../models/Product'
import {Delivery} from '../models/DeliveryOrder'
import { Error } from 'mongoose'

class deliveryController {
  static async getDeliveryOrder (req: Request , res: Response) {
    const findDeliveryOrder = await Delivery.find({})
    res.status(200).json({msg:findDeliveryOrder})
  }

  static async createDeliveryOrder (req: Request , res: Response){
    
    const {id} = req.params
    const {deliveryCode,id_product,id_item} = req.body
    const findUser = await User.findById((<any>req).Id)
    const findPurchase = await Purchase.findById(id)

    try {
      if(findUser.role === "inventory"){
        const newDeliveryOrder = {
          id_product : id_product,
          id_item : id_item,
          deliveryCode : deliveryCode,
        }
        const create_DO = await Delivery.create(newDeliveryOrder)
        if(create_DO && (!id_product === true)){
          const update_DO = await Delivery.findByIdAndUpdate(create_DO._id,{$set:{purchase_id:id}},{new:true})
          for(let i = 0 ; i < findPurchase.product.length; i ++){
            await Product.findByIdAndUpdate(findPurchase.product[i].product_id,{$inc:{stock:findPurchase.product[i].quantity}},{new:true})
          }
          res.status(200).json({msg:"your DO have been created", data:update_DO})
        }else if(!id_product === false){
          const findPurchaseSpecific = await Purchase.findById(id)
          for(let i = 0 ; i < findPurchaseSpecific.product.length ; i ++){
            if(findPurchaseSpecific.product[i].product_id.toString() === id_product){
              const findProductUpdate = await Product.findByIdAndUpdate(id_product,{$inc:{stock:findPurchaseSpecific.product[i].quantity}},{new:true})
              res.status(200).json({msg:findProductUpdate})
            }else{
              res.status(500)
            }
          }
        }
      }
    } catch (error) {
      res.status(500).json({msg: "cannot create PO",data:error})
    }
  }
}

export default deliveryController