import mongoose from 'mongoose'

interface ICancel {
  orderCashier_id : string,
  reason : string,
  codeOrder : string
}

interface CancelDoc extends mongoose.Document {
  orderCashier_id : string,
  reason : string,
  codeOrder : String
}

interface CancelModel extends mongoose.Model <CancelDoc>{
  build(attr : ICancel) : CancelDoc
}

const cancelSchema = new mongoose.Schema({
  orderCashier_id : {type:mongoose.Types.ObjectId, ref: 'createOrderCashierSchema'},
  reason : {type: String, required:true},
  codeOrder : {type:String,unique:true}
},{
  timestamps:true,
  versionKey :false
})

const Cancel = mongoose.model<CancelDoc,CancelModel> ('cancelSchema',cancelSchema)

export {Cancel}

