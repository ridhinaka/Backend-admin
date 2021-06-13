import {Request,Response,NextFunction} from 'express'
import {User} from '../models/Users'
import {Product} from '../models/Product'
import {Cancel} from '../models/CancelOrderCashier'
import { CreateOrderCashier } from '../models/CreateOrderCashier'
import {Receivable} from '../models/Receivable'

class createOrderCashierController {
  static async getAllOrder (req: Request, res: Response){
    const getAllActiveProduct = await Product.find({productStatus:"active"})
    .populate('cashierProduct_id')
    res.status(200).json({data:getAllActiveProduct})
  }

  static async createOrder (req: Request, res: Response){
    const findUser = await User.findById((<any>req).Id)
    const {cashierProduct_id,quantity_product}= req.body
    const findProduct = await Product.findById(cashierProduct_id)
    try {
      if(findUser.role === "cashier"){
        const newCreateOrderCashier = {
          code_order_cashier: req.body.code_order_cashier,
          productsCashier : [ 
            {
              cashierProduct_id :cashierProduct_id,
              quantity_product : quantity_product,
              subTotal: findProduct.sellingPrice * quantity_product,
            },
          ],
        }
        const createOrderCashier = await CreateOrderCashier.create(newCreateOrderCashier)
        if(createOrderCashier){
          const newReceivable = {
            orderCashier_id : createOrderCashier._id
          }
          await Receivable.create(newReceivable)
        }
        const populateProduct = await CreateOrderCashier.findById(createOrderCashier._id).populate('productsCashier.cashierProduct_id')
        res.status(201).json({msg:populateProduct}) 
      }else{
        res.status(500).json({msg:"you are not allowed to create order"})
      }
    } catch (error) {
      res.status(500).json({msg:"salah"})
    }
  }

  static async addProductCashier (req: Request, res: Response){
    const {id} = req.params 
    const {cashierProduct_id,quantity_product} = req.body
    const findOrderCashier = await CreateOrderCashier.findById(id)
    const findProduct = await Product.findById(cashierProduct_id)

    try {
      if(findOrderCashier){
        const updateOrderCashier = await CreateOrderCashier.findByIdAndUpdate(id,{$push:{productsCashier:[{cashierProduct_id:cashierProduct_id,quantity_product:quantity_product,subTotal:findProduct.sellingPrice}]}},{new:true})
        await Product.findByIdAndUpdate(cashierProduct_id,{$inc: {stock: - quantity_product}},{new:true})

        res.status(200).json({msg:updateOrderCashier})
      }else{
        res.status(500).json({msg:"your order doesnt exist"})
      }
    } catch (error) {
      res.status(500)
    }
  }

  static async getTotalOrderCashier (req:Request, res: Response){
    const {id} = req.params

    try {
      const findCreateOrderCashier = await CreateOrderCashier.findById(id);
      let totalArray = [];
      for (let i = 0; i < findCreateOrderCashier.productsCashier.length; i++) {
        let array = [];
        if (findCreateOrderCashier.productsCashier[i]) {
          array.push(findCreateOrderCashier.productsCashier[i].subTotal);
          for (let j = 0; j < array.length; j++) {
            totalArray.push(array[j]);
          }
        }
      }
      let subTotalCashier = 0;
      for (let k = 0; k < totalArray.length; k++) {
        subTotalCashier += totalArray[k];
      }
      const updateTotalOrder = await CreateOrderCashier.findByIdAndUpdate(id,{$set:{subTotalCashier:subTotalCashier,grandTotal:subTotalCashier}},{new:true})
      if(updateTotalOrder){
        await Receivable.findOneAndUpdate({orderCashier_id:updateTotalOrder._id},{$set:{grandTotal:subTotalCashier}},{new:true})
      }
      res.status(200).json({ msg: "your subTotalCashier ", data: subTotalCashier });
    } catch (error) {
      res.status(500)
    }
  }

  static async taxOrder (req: Request, res:Response){
    const {id} = req.params
    const findOrderCashier_id = await CreateOrderCashier.findById(id)
    let isTax = findOrderCashier_id.subTotalCashier * (10/100)
    let newSubTotal = findOrderCashier_id.subTotalCashier + isTax
    
    try {
      if(findOrderCashier_id){
        const isTaxOrder = await CreateOrderCashier.findByIdAndUpdate(id,{$set:{subTotalTax:newSubTotal,grandTotal:newSubTotal}},{new:true})
        if(isTaxOrder){
          await Receivable.findOneAndUpdate({orderCashier_id:isTaxOrder._id},{$set:{grandTotal:newSubTotal}},{new:true})
        }
        res.status(200).json({msg:"your total order are",isTaxOrder})
      }else{
        res.status(500).json({msg:"your order doesnt exist"})
      }
    } catch (error) {
      res.status(500)
    }
  } 

  static async noTaxOrder (req: Request, res:Response){
    const {id} = req.params
    const findOrderCashier_id = await CreateOrderCashier.findById(id)
    let isTax = findOrderCashier_id.subTotalCashier * (10/100)
    let newSubTotalNoTax = findOrderCashier_id.subTotalTax - isTax
    
    try {
      if(findOrderCashier_id){
        const isNoTaxOrder = await CreateOrderCashier.findByIdAndUpdate(id,{$set:{subTotalNoTax:newSubTotalNoTax,grandTotal:newSubTotalNoTax}},{new:true})
        if(isNoTaxOrder){
          await Receivable.findOneAndUpdate({orderCashier_id:isNoTaxOrder._id},{$set:{grandTotal:newSubTotalNoTax}},{new:true})
        }
        res.status(200).json({msg:"your total order are",isNoTaxOrder})
      }else{
        res.status(500).json({msg:"your order doesnt exist"})
      }
    } catch (error) {
      res.status(500)
    }
  }
  static async cancelOrder (req:Request, res: Response){
    const {id} = req.params
    const findOrderCashier = await CreateOrderCashier.findById(id)
    try {
      if(findOrderCashier){
        const newCancel = {
          orderCashier_id : id,
          reason : req.body.reason,
          codeOrder : findOrderCashier.code_order_cashier
        }
        const createCancelOrder = await Cancel.create(newCancel)
        if(createCancelOrder){
          const updateStatusOrderCashier = await CreateOrderCashier.findByIdAndUpdate(id,{$set:{status:"cancel order"}},{new:true})
          await Receivable.findOneAndRemove({orderCashier_id:updateStatusOrderCashier._id})
        }
        res.status(200).json({msg:"your order have been canceled",data:createCancelOrder})
      }else{
        res.status(500).json({msg:"your order doesnt exist"})
      }
    } catch (error) {
      res.status(500).json({msg:"your order have been cancelled already"})
    }
  }
}

export default createOrderCashierController