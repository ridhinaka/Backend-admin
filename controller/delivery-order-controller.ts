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

    const {deliveryCode,id_product,id_item,purchase_id} = req.body
    const findUser = await User.findById((<any>req).Id)
    const findPurchase = await Purchase.findById(purchase_id)

    try {
      if(findUser.role === "inventory"){
        const newDeliveryOrder = {
          id_product : id_product,
          purchase_id : purchase_id,
          deliveryCode : deliveryCode,
          date: req.body.date
        }
        const create_DO = await Delivery.create(newDeliveryOrder) 
        if(create_DO && (!id_product === true)){
          const update_DO = await Delivery.findByIdAndUpdate(create_DO._id,{$set:{purchase_id:purchase_id}},{new:true})
          for(let i = 0 ; i < findPurchase.products.length; i ++){
            await Product.findByIdAndUpdate(findPurchase.products[i].product_id,{$inc:{stock:findPurchase.products[i].quantity}},{new:true})
          }
          res.status(201).json({msg:"your DO have been created", data:update_DO})
        }
        else if(!id_product === false){
          const createDO = await Delivery.create(newDeliveryOrder) 
          const findPurchaseSpecific = await Purchase.findById(purchase_id)
          for(let i = 0 ; i < findPurchaseSpecific.products.length ; i ++){
            if(findPurchaseSpecific.products[i].product_id.toString() === id_product){
              const updateStockProduct = await Product.findByIdAndUpdate(id_product,{$inc:{stock:findPurchaseSpecific.products[i].quantity}},{new:true})
              if(updateStockProduct){
                const findPurchaseForDelivery = await Purchase.findById(purchase_id)
                for(let i = 0 ; i < findPurchaseForDelivery.productsDeliveryOrder.length ; i ++){
                  if(findPurchaseForDelivery.productsDeliveryOrder[i].product_id.toString() === id_product){
                    console.log("ini id",findPurchaseForDelivery.productsDeliveryOrder[i].product_id)
                    await Purchase.findByIdAndUpdate(purchase_id,{$pull:{productsDeliveryOrder:{product_id:findPurchaseForDelivery.productsDeliveryOrder[i].product_id}}},{multi:true})
                  }
                }
              }
            }
            else{
              res.status(500).json({msg:"error"})
            }
          }
          res.status(201).json({msg:createDO})
        }
      }
    } catch (error) {
      res.status(500).json({msg: "cannot create PO",data:error})
    }
  }
}

export default deliveryController