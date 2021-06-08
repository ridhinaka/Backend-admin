import mongoose from 'mongoose'

interface IPayable {
  supplier_id : string,
  id_invoice : string,
  amount : number,
  remainingCredit : number
}

interface PayableDoc extends mongoose.Document{
  supplier_id : string,
  id_invoice : string,
  amount : number, 
  remainingCredit : number
}

interface PayableModel extends mongoose.Model <PayableDoc>{
  build(attr : IPayable) : PayableDoc
}

const payableSchema = new mongoose.Schema({
  supplier_id : {type: mongoose.Types.ObjectId, ref:'supplierSchema'},
  id_invoice : {type:mongoose.Types.ObjectId, ref: 'invoiceSchema'},
  amount : {type: Number},
  remainingCredit : {type:Number}
},
  {
    timestamps:true,
    versionKey :false
  })

  const Payable = mongoose.model<PayableDoc, PayableModel>('payableSchema',payableSchema)

  export {Payable}