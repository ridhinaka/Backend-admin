import mongoose from 'mongoose'

interface IPayable {
  supplier_id : string,
  amount : string, 
}

interface PayableDoc extends mongoose.Document{
  supplier_id : string,
  amount : string, 
}

interface PayableModel extends mongoose.Model <PayableDoc>{
  build(attr : IPayable) : PayableDoc
}

const payableSchema = new mongoose.Schema({
  supplier_id : {type: mongoose.Types.ObjectId, ref:'supplierSchema'},
  amount : {type: String, required:true}
},
  {
    timestamps:true,
    versionKey :false
  })

  const Payable = mongoose.model<PayableDoc, PayableModel>('payableSchema',payableSchema)

  export {Payable}