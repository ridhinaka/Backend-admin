import mongoose from 'mongoose'

interface IChangeStatus {
  invoice_id : string,
  amount : number
}

interface ChangeStatusDoc extends mongoose.Document {
  invoice_id : string,
  amount : number
}

interface ChangeStatusModel extends mongoose.Model <ChangeStatusDoc>{
  build(attr : IChangeStatus) : ChangeStatusDoc
}

const changeStatusSchema = new mongoose.Schema({
  invoice_id : {type: mongoose.Types.ObjectId, ref:'invoiceSchema'},
  amount : {type: Number, required:true}
},
  {
    timestamps:true,
    versionKey :false
  })

const  ChangeStatus = mongoose.model<ChangeStatusDoc, ChangeStatusModel>('changeStatusSchema',changeStatusSchema)

export {ChangeStatus}