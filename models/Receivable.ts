import mongoose from 'mongoose'
interface IReceivable {
  orderCashier_id : string,
  grandTotal : number
}

interface ReceivableDoc extends mongoose.Document{
  orderCashier_id :string,
  grandTotal : number
}

interface ReceivableModel extends mongoose.Model <ReceivableDoc>{
  build(attr : IReceivable) : ReceivableDoc
}

const receivableSchema = new mongoose.Schema({
  orderCashier_id : {type: mongoose.Types.ObjectId, ref: 'createOrderCashierSchema'},
  grandTotal : {type:Number}
},{
  timestamps:true,
  versionKey :false
})

const Receivable = mongoose.model<ReceivableDoc, ReceivableModel> ('receivableSchema', receivableSchema)

export {Receivable}