import mongoose from 'mongoose'

interface IReceipt {
  product_id : string,
  taxStatus : boolean,
  totalProduct : number,
  subTotal : number
}

interface ReceiptDoc extends mongoose.Document {
  product_id : string,
  taxStatus : boolean,
  totalProduct : number,
  subTotal : number
}

interface ReceiptModel extends mongoose.Model <ReceiptDoc>{
  build(attr : IReceipt): ReceiptDoc
}

const receiptSchema = new mongoose.Schema ({
  product_id :{type: mongoose.Types.ObjectId, ref:'productSchema'},
  taxStatus : {type: Boolean, default: false},
  totalProduct : {type: mongoose.Types.ObjectId, ref:'productSchema'},
  subTotal : {type: mongoose.Types.ObjectId, ref:'productSchema'},
},{
    timestamps:true,
    versionKey :false
})

const Receipt = mongoose.model<ReceiptDoc, ReceiptModel>('receiptSchema',receiptSchema)

export {Receipt}
