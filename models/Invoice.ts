import mongoose from 'mongoose'

interface IInvoice {
  purchaseCode: string, 
  invoiceCode : string,
  status : string,
  grandTotal :number,
  remaining_credit : number,
}

interface InvoiceDoc extends mongoose.Document {
  purchaseCode : string,
  invoiceCode : string,
  status : string,
  grandTotal :number,
  remaining_credit : number,
}

interface InvoiceModel extends mongoose.Model <InvoiceDoc>{
  build(attr : IInvoice) : InvoiceDoc
}

const invoiceSchema = new mongoose.Schema ({
  purchaseCode : {type: mongoose.Types.ObjectId, ref:'purchaseSchema'},
  invoiceCode :{type: String,required: true, unique :true},
  status : {type: String, default: "pending"},
  grandTotal : {type:Number,default:0},
  remaining_credit : {type:Number, default: 0},
},{
    timestamps:true,
    versionKey :false
  })

  const Invoice = mongoose.model<InvoiceDoc, InvoiceModel>('invoiceSchema', invoiceSchema)

export {Invoice}
