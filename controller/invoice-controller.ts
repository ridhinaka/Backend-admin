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

  static async createInvoice (req: Request , res: Response) {
    const {code_order_id} = req.body
    const findUser = await User.findById((<any>req).Id)

    try {
      if(findUser.role === "finance"){
        const findPurchaseId = await Purchase.findById(code_order_id)
        const findOrderId = await Invoice.findOne({code_order_id:code_order_id})
        if(findPurchaseId && !findOrderId){
          const newInvoice = {
            code_order_id : code_order_id,
            invoiceCode : req.body.invoiceCode
          }
          const create_invoice = await Invoice.create(newInvoice)
          const updateInvoice = await Invoice.findByIdAndUpdate(create_invoice._id,{$set:{order_id:code_order_id,totalAmount:findPurchaseId.totalOrder}},{new:true}).populate('order_id')
          res.status(200).json({msg:"your invoice have been created",data:updateInvoice})
        }else{
          res.status(500).json({msg: "you invoice already created"})
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
    const findInvoice = await Invoice.findById(id).populate('code_order_id')
    const findTotalOrder:any = findInvoice.code_order_id
    const findUser = await User.findById((<any>req).Id)

    try {
      if(findUser.role === "finance"){
        const newChange = {
          invoice_id : id,
          amount : req.body.amount
        }
      const change_status = await ChangeStatus.create(newChange)
      const changeStatusCalculation = findTotalOrder.totalOrder - change_status.amount
        if(findInvoice.status === "pending"){
          if(changeStatusCalculation === 0) {
            const updateInvoiceStatus = await Invoice.findByIdAndUpdate(id,{$set:{status: "paid"}},{new:true})
            res.status(200).json({msg:updateInvoiceStatus})
          }else{
            const updateInvoiceCredit = await Invoice.findByIdAndUpdate(id,{$inc:{totalAmount: -change_status.amount}},{new:true})
            console.log(updateInvoiceCredit)
            res.status(200).json({msg: "remaining credit" + ' ' + updateInvoiceCredit.totalAmount})
          }
        }
      }
    } catch (error) {
      res.status(500).json({msg:error})
    }
  }
}

export default invoiceController