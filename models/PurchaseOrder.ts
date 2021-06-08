import mongoose from 'mongoose'

interface IPurchase {
  supplier_id : string,
  supplier_name: string,
  codeOrder : string,
  discount : number
  products : [{
    product_id : string,
    totalOrder :number,
    quantity : number,
    discount : number
  }]
  totalAmount : number,
}

interface PurchaseDoc extends mongoose.Document {
  supplier_id : string,
  supplier_name: string,
  codeOrder : string,
  discount : number,
  products : [{
    product_id : string,
    totalOrder :number,
    quantity : number
  }]
  totalAmount : number,
}

interface PurchaseModel extends mongoose.Model <PurchaseDoc>{
  build(attr : IPurchase) : PurchaseDoc
}

const purchaseSchema = new mongoose.Schema({
  supplier_id : {type: mongoose.Types.ObjectId, ref:'supplierSchema'},
  supplier_name : {type: String},
  codeOrder : {type: String, required:true},
  discount : {type: Number, default: 0},
  products : [{
    product_id : {type: mongoose.Types.ObjectId, ref:'productSchema'},
    totalOrder : {type: Number, default:0},
    quantity : {type: Number, required:true},
  }],
  totalAmount : {type: Number}
},
  {
    timestamps:true,
    versionKey :false
  })

const  Purchase = mongoose.model<PurchaseDoc, PurchaseModel>('purchaseSchema',purchaseSchema)

export {Purchase}