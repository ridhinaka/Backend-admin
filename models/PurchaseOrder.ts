import mongoose from 'mongoose'

interface IPurchase {
  supplier_id : string,
  codeOrder : string,
  discount : number
  products : [{
    product_id : string,
    totalOrder :number,
    quantity : number,
  }],
  productsDeliveryOrder : [{
    product_id : string,
    totalOrder :number,
    quantity : number
  }],
  status : boolean,
  totalAmount : number,
}

interface PurchaseDoc extends mongoose.Document {
  supplier_id : string,
  codeOrder : string,
  discount : number,
  products : [{
    product_id : string,
    totalOrder :number,
    quantity : number
  }],
  productsDeliveryOrder : [{
    product_id : string,
    totalOrder :number,
    quantity : number
  }],
  status : boolean,
  totalAmount : number,
}

interface PurchaseModel extends mongoose.Model <PurchaseDoc>{
  build(attr : IPurchase) : PurchaseDoc
}

const purchaseSchema = new mongoose.Schema({
  supplier_id : {type: mongoose.Types.ObjectId, ref:'supplierSchema'},
  codeOrder : {type: String, required:true},
  discount : {type: Number, default: 0},
  products : [{
    product_id : {type: mongoose.Types.ObjectId, ref:'productSchema'},
    totalOrder : {type: Number, default:0},
    quantity : {type: Number, required:true},
  }],
  productsDeliveryOrder : [{
    product_id : {type:String, ref:'productSchema'},
    totalOrder : {type: Number},
    quantity : {type: Number}
  }],
  status: {type: Boolean,default: false},
  totalAmount : {type: Number}
},
  {
    timestamps:true,
    versionKey :false
  })

const  Purchase = mongoose.model<PurchaseDoc, PurchaseModel>('purchaseSchema',purchaseSchema)

export {Purchase}