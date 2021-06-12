import {Request,Response,NextFunction} from 'express'
import {Invoice} from '../models/Invoice'
import {User} from '../models/Users'
import {Purchase} from '../models/PurchaseOrder'
import {ChangeStatus} from '../models/ChangeStatus'
import {Payable} from '../models/Payable'
import {Supplier} from '../models/Supplier'

class invoiceController {
  static async getInvoice (req: Request , res: Response) {
    const findInvoice = await Invoice.find({})
    res.status(200).json({msg: findInvoice})
  }

  static async getSpecificInvoice (req:Request, res:Response){
    const {id} = req.params

    try {
      const specificInvoice = await Invoice.findById(id).populate('purchaseCode')
      res.status(200).json({msg:specificInvoice})
    } catch (error) {
      res.status(500).json({msg:error})
    }
  }

  static async createInvoice (req: Request , res: Response) {
    const {id} = req.params
    const {purchaseCode} = req.body
    const findUser = await User.findById((<any>req).Id)

    try {
      if(findUser.role === "finance"){
        const findPurchaseOrder = await Purchase.findById(purchaseCode)
        console.log(purchaseCode)
        const findInvoice = await Invoice.findOne({purchaseCode:purchaseCode})
          const newInvoice = {
            purchaseCode,
            invoiceCode : req.body.invoiceCode
          }
          if(findPurchaseOrder === null || findInvoice !== null){
            res.status(500).json({msg:"cannot create invoice"})
          }else{
            const create_newInvoice = await Invoice.create(newInvoice)
            const updatePurchase = await Purchase.findByIdAndUpdate(purchaseCode,{$set:{status:true}},{new:true})
            const updateInvoice = await Invoice.findByIdAndUpdate(create_newInvoice._id,{$set:{purchaseCode:purchaseCode,supplier_id:findPurchaseOrder.supplier_id,grandTotal:findPurchaseOrder.totalAmount,remaining_credit:findPurchaseOrder.totalAmount}},{new:true}).populate('purchaseCode')
            if(updateInvoice){
              const newPayable = {
                supplier_id : findPurchaseOrder.supplier_id,
                id_invoice : updateInvoice._id,
                amount : updateInvoice.grandTotal,
                remainingCredit : updateInvoice.remaining_credit
              }
              await Payable.create(newPayable)
            }
            res.status(201).json({msg:"your invoice have been created",data:updateInvoice})
          } 
      }else{
        res.status(500).json({msg: "you are not allowed to create invoice"})
      }
    } catch (error) {
      res.status(500).json({msg: "cannot create Invoice",data:error})
    }
  }

  static async changeStatus (req: Request, res: Response){
    const {id} = req.params
    const {purchase_id} = req.body
    const findInvoice = await Invoice.findById(id)
    const findUser = await User.findById((<any>req).Id)
    
    try {
      if(findUser.role === "finance"){
        const newChange = {
          invoice_id : id,
          purchase_id :purchase_id,
          amount : req.body.amount
        }
      const findPurchaseAmount = await Purchase.findById(purchase_id)
      const checkDocument = await ChangeStatus.countDocuments({invoice_id:findInvoice._id})
      if(checkDocument === 0){
        const change_status = await ChangeStatus.create(newChange)
        const updateChange = await Invoice.findByIdAndUpdate(id,{$set:{remaining_credit:findPurchaseAmount.totalAmount}},{new:true})
        const newTotal = updateChange.remaining_credit - change_status.amount
        const invoiceUpdate = await Invoice.findByIdAndUpdate(id,{$set:{remaining_credit:newTotal}},{new:true})
        if(newTotal !== 0){
          const updateCredit = await Invoice.findByIdAndUpdate(id,{$set:{remaining_credit:invoiceUpdate.remaining_credit}},{new:true})
          await Payable.findOneAndUpdate({id_invoice:updateCredit._id},{$set
            :{remainingCredit: updateCredit.remaining_credit}},{new:true})
          res.status(200).json({msg:"your remaining credit are",data:updateCredit})
        }else{
          const updateInvoiceStatus = await Invoice.findByIdAndUpdate(id,{$set:{status:"paid"}},{new:true})
          await Payable.findOneAndUpdate({id_invoice:updateInvoiceStatus._id},{$set:{remainingCredit:0}},{new:true})
          res.status(200).json({msg:"paid",data:updateInvoiceStatus})
          }
        }else{
          const updateChange = {
            amount : req.body.amount
          }
          const updateChangeStatus = await ChangeStatus.findOneAndUpdate({invoice_id:findInvoice._id},{$set:{amount:req.body.amount}},{new:true})
          if(updateChange){
            const UpdateTotalCreditInvoice = await Invoice.findByIdAndUpdate(id,{$inc:{remaining_credit:- updateChangeStatus.amount}},{new:true})
            await Payable.findOneAndUpdate({id_invoice:UpdateTotalCreditInvoice._id},{$set:{remainingCredit: UpdateTotalCreditInvoice.remaining_credit}},{new:true})
            if(UpdateTotalCreditInvoice.remaining_credit === 0){
              const updateInvoiceStatus = await Invoice.findByIdAndUpdate(id,{$set:{status:"paid"}},{new:true})
              await Payable.findOneAndUpdate({id_invoice:updateInvoiceStatus._id},{$set:{remainingCredit:0}},{new:true})
              res.status(200).json({data:updateInvoiceStatus})
            }else{
              res.status(200).json({msg:UpdateTotalCreditInvoice})
            }
          }
        }
      }
    } catch (error) {
      res.status(500).json({msg:error})
    }
  }
  static async changeStatusTest (req: Request, res: Response){
    const {id} = req.params
    const {purchase_id,invoice_id} = req.body
    const findInvoice = await Invoice.findById(invoice_id)
    const findUser = await User.findById((<any>req).Id)
    
    try {
      if(findUser.role === "finance"){
        const newChange = {
          invoice_id : invoice_id,
          purchase_id :purchase_id,
          amount : req.body.amount
        }
      const findPurchaseAmount = await Purchase.findById(purchase_id)
      const checkDocument = await ChangeStatus.countDocuments({invoice_id:findInvoice._id})
      if(checkDocument === 0){
        const change_status = await ChangeStatus.create(newChange)
        const updateChange = await Invoice.findByIdAndUpdate(invoice_id,{$set:{remaining_credit:findPurchaseAmount.totalAmount}},{new:true})
        const newTotal = updateChange.remaining_credit - change_status.amount
        const invoiceUpdate = await Invoice.findByIdAndUpdate(invoice_id,{$set:{remaining_credit:newTotal}},{new:true})
        if(newTotal !== 0){
          const updateCredit = await Invoice.findByIdAndUpdate(invoice_id,{$set:{remaining_credit:invoiceUpdate.remaining_credit}},{new:true})
          await Payable.findOneAndUpdate({id_invoice:updateCredit._id},{$set:{remainingCredit:updateCredit.remaining_credit}},{new:true})
          res.status(200).json({msg:"your remaining credit are",data:updateCredit})
        }else{
          const updateInvoiceStatus = await Invoice.findByIdAndUpdate(invoice_id,{$set:{status:"paid"}},{new:true})
          await Payable.findOneAndUpdate({id_invoice:updateInvoiceStatus._id},{$set:{remainingCredit:0}},{new:true})
          res.status(200).json({msg:"paid",data:updateInvoiceStatus})
          }
        }else{
          const updateChange = {
            invoice_id : invoice_id,
            purchase_id :purchase_id,
            amount : req.body.amount
          }
          const updateChangeStatus = await ChangeStatus.findOneAndUpdate({invoice_id:findInvoice._id},{$set:{amount:req.body.amount}},{new:true})
          if(updateChange){
            const UpdateTotalCreditInvoice = await Invoice.findByIdAndUpdate(invoice_id,{$inc:{remaining_credit:- updateChangeStatus.amount}},{new:true})
            await Payable.findOneAndUpdate({id_invoice:UpdateTotalCreditInvoice._id},{$inc:{remainingCredit:-UpdateTotalCreditInvoice.remaining_credit}},{new:true})
            if(UpdateTotalCreditInvoice.remaining_credit === 0){
              const updateInvoiceStatus = await Invoice.findByIdAndUpdate(invoice_id,{$set:{status:"paid"}},{new:true})
              await Payable.findOneAndUpdate({id_invoice:updateInvoiceStatus._id},{$set:{remainingCredit:0}},{new:true})
              res.status(200).json({data:updateInvoiceStatus})
            }else{
              res.status(200).json({msg:UpdateTotalCreditInvoice})
            }
          }
        }
      }
    } catch (error) {
      res.status(500).json({msg:error})
    }
  }
}

export default invoiceController