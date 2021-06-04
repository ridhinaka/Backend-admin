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
    const {id} = req.params
    const findUser = await User.findById((<any>req).Id)

    try {
      if(findUser.role === "finance"){
        const findPurchaseOrder = await Purchase.findById(id)
        const findInvoice = await Invoice.findOne({purchaseCode:id})
        if(findInvoice === null){
          const newInvoice = {
            invoiceCode : req.body.invoiceCode
          }
          const create_newInvoice = await Invoice.create(newInvoice)
          const updateInvoice = await Invoice.findByIdAndUpdate(create_newInvoice._id,{$set:{purchaseCode:id}},{new:true}).populate('purchaseCode')
          res.status(200).json({msg:"your invoice have been created",data:updateInvoice})
        }else{
          res.status(500).json({msg:"your invoice already created"})
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
      const change_status = await ChangeStatus.create(newChange)
      const updateChange = await Invoice.findByIdAndUpdate(id,{$set:{remaining_credit:findPurchaseAmount.totalAmount}},{new:true})

      const newTotal = updateChange.remaining_credit - change_status.amount
      await Invoice.findByIdAndUpdate(id,{$set:{remaining_credit:newTotal}},{new:true})

      if(newTotal !== 0){
        const updateCredit = await Invoice.findByIdAndUpdate(id,{$inc:{remaining_credit: - change_status.amount }},{new:true})
        
        res.status(200).json({msg:"your remaining credit are",data:updateCredit})
      }else{
        const updateInvoiceStatus = await Invoice.findByIdAndUpdate(id,{$set:{status:"paid"}},{new:true})
        res.status(200).json({msg:"paid",data:updateInvoiceStatus})
      }
      }
    } catch (error) {
      res.status(500).json({msg:error})
    }
  }
}

export default invoiceController