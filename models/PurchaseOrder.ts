import mongoose from 'mongoose'

interface IPurchase {
  product_id : string[],
  supplier_id : string,
  codeOrder : string,
  totalOrder : number,
  discount : number,
  quantity : number,
}

interface PurchaseDoc extends mongoose.Document {
  product_id : string[],
  supplier_id : string,
  codeOrder : string,
  totalOrder : number,
  discount : number,
  quantity : number,
}

interface PurchaseModel extends mongoose.Model <PurchaseDoc>{
  build(attr : IPurchase) : PurchaseDoc
}

const purchaseSchema = new mongoose.Schema({
  product_id : [{type: mongoose.Types.ObjectId, ref:'productSchema'}],
  supplier_id : {type: mongoose.Types.ObjectId, ref:'supplierSchema'},
  codeOrder : {type: String, required:true},
  totalOrder : {type: Number, default:0},
  discount : {type: Number, default: 0},
  quantity : {type: Number, required:true}
},
  {
    timestamps:true,
    versionKey :false
  })

const  Purchase = mongoose.model<PurchaseDoc, PurchaseModel>('purchaseSchema',purchaseSchema)

export {Purchase}