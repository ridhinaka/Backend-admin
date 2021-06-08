import mongoose from 'mongoose'

interface Iestatement {
  id_payable :string,
  id_receivable : string,
  revenue : number,
  status : boolean
}

interface estatementDoc extends mongoose.Document {
  id_payable : string,
  id_receivable : string,
  revenue : number,
  status : boolean
}

interface estatementModel extends mongoose.Model <estatementDoc>{
  build(attr : Iestatement) : estatementDoc
}

const estatementSchema = new mongoose.Schema({
  id_payable : {type: mongoose.Types.ObjectId, ref : 'payableSchema'},
  id_receivable : {type: mongoose.Types.ObjectId, ref : 'receivableSchema'},
  revenue: {type: Number},
  status : {type:Boolean,default:null}
},{
  timestamps:true,
  versionKey :false
})

const estatement = mongoose.model<estatementDoc, estatementModel>('estatementSchema', estatementSchema)

export {estatement} 