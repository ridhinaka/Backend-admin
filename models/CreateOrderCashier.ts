import mongoose from 'mongoose'

interface ICreateOrderCashier {
  code_order_cashier : string,
  productsCashier : [{
    cashierProduct_id : string,
    quantity_product : number,
    subTotal : number,
  }]
  subTotalCashier :number,
  subTotalTax :number,
  subTotalNoTax : number,
  grandTotal : number,
  status: string,
}

interface CreateOrderCashierDoc extends mongoose.Document {
  code_order_cashier : string,
  productsCashier : [{
    cashierProduct_id : string,
    quantity_product : number,
    subTotal : number,
  }]
  subTotalCashier :number,
  subTotalTax :number,
  subTotalNoTax : number,
  grandTotal : number,
  status: string,
}

interface CreateOrderCashierModel extends mongoose.Model <CreateOrderCashierDoc>{
  build(attr : ICreateOrderCashier) : CreateOrderCashierDoc
}

const createOrderCashierSchema = new mongoose.Schema({
  code_order_cashier : {type: String, required:true,unique:true},
  productsCashier : [{
    cashierProduct_id : {type: mongoose.Types.ObjectId, ref:'productSchema'},
    quantity_product : {type: Number, required:true},
    subTotal : {type: Number, default:0},
  }],
  subTotalCashier :{type: Number},
  subTotalTax :{type: Number},
  subTotalNoTax : {type: Number},
  grandTotal : {type: Number},
  status: {type: String, default: "succeed"}
},{
  timestamps:true,
  versionKey :false
})

const CreateOrderCashier = mongoose.model<CreateOrderCashierDoc, CreateOrderCashierModel>('createOrderCashierSchema', createOrderCashierSchema)

export {CreateOrderCashier}