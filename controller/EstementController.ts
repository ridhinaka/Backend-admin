import {Request,Response,NextFunction} from 'express'
import {User} from '../models/Users'
import {Payable} from '../models/Payable'
import { Receivable } from '../models/Receivable'
import { estatement } from '../models/E-Statement'
import payableRoutes from '../routes/payable - routes'

class EStatementController {

    static async createEStatement (req : Request, res : Response){
      const inputDateFrom : any = req.body.dateFrom;
      const inputDateUntill : any = req.body.dateTo;
      const date_from = inputDateFrom + "T00:00:00.0000"
      const date_to = inputDateUntill + "T23:59:59.0000"
      const rangeDate : object = { $gte : date_from, $lte: date_to}
      let getAllPayable : any;
      let getAllReceivable : any;
      try {
        const findUser = await User.findById((<any>req).Id)
        if(findUser.role === "owner"){
          const createEstatement = {
            codeEstatement : req.body.codeEstatement
          }
          const create_estatement = await estatement.create(createEstatement)
          let totalPayable = 0
          getAllPayable = await Payable.find({date:rangeDate})
          for (let i = 0 ; i < getAllPayable.length ; i ++){
            totalPayable += getAllPayable[i].amount
          }
          let totalReceivable = 0
          getAllReceivable = await Receivable.find({createdAt:rangeDate})
          for (let j = 0; j < getAllReceivable.length ; j ++){
            totalReceivable += getAllReceivable[j].grandTotal
          }
          let revenue = totalReceivable - totalPayable
          if(totalReceivable > totalPayable){
            const updateEstatement = await estatement.findByIdAndUpdate(create_estatement._id,{$set:{totalPayable:totalPayable, totalReceivable: totalReceivable, revenue:revenue, status:true}},{new:true})
            res.status(200).json({data:updateEstatement})
          }else if(totalReceivable < totalPayable){
            const updateEstatement_1 = await estatement.findByIdAndUpdate(create_estatement._id,{$set:{totalPayable:totalPayable, totalReceivable: totalReceivable, revenue:revenue, status:false}},{new:true})
            res.status(200).json({data:updateEstatement_1})
          }else{
            const updateEstatement_2 = await estatement.findByIdAndUpdate(create_estatement._id,{$set:{totalPayable:totalPayable, totalReceivable: totalReceivable, revenue:revenue}},{new:true})
            res.status(200).json({data:updateEstatement_2})
          }
        }
      } catch (error) {
        res.status(500).json({msg:error})
      }
    }
}
export default EStatementController