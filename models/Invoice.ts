import mongoose from 'mongoose'

interface IInvoice {
  code_order_id: string, 
  totalAmount : number,
  invoiceCode : string,
  status : string,
}

interface InvoiceDoc extends mongoose.Document {
  code_order_id : string,
  totalAmount : number,
  invoiceCode : string,
  status : string,
}

interface InvoiceModel extends mongoose.Model <InvoiceDoc>{
  build(attr : IInvoice) : InvoiceDoc
}

const invoiceSchema = new mongoose.Schema ({
  code_order_id : {type: mongoose.Types.ObjectId, ref:'purchaseSchema'},
  totalAmount : {type: Number},
  invoiceCode :{type: String,required: true, unique :true},
  status : {type: String, default: "pending"},
},{
    timestamps:true,
    versionKey :false
  })

  const Invoice = mongoose.model<InvoiceDoc, InvoiceModel>('invoiceSchema', invoiceSchema)

export {Invoice}