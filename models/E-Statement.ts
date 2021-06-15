import mongoose from 'mongoose'

interface Iestatement {
  codeEstatement : string,
  totalPayable : number,
  totalReceivable : number,
  revenue : number,
  status : boolean
}

interface estatementDoc extends mongoose.Document {
  codeEstatement : string,
  totalPayable : number,
  totalReceivable : number,
  revenue : number,
  status : boolean
}

interface estatementModel extends mongoose.Model <estatementDoc>{
  build(attr : Iestatement) : estatementDoc
}

const estatementSchema = new mongoose.Schema({
  codeEstatement : {type:String, required:true,unique:true},
  totalPayable : {type: Number},
  totalReceivable : {type: Number},
  revenue: {type: Number},
  status : {type:Boolean,default:null}
},{
  timestamps:true,
  versionKey :false
})

const estatement = mongoose.model<estatementDoc, estatementModel>('estatementSchema', estatementSchema)

export {estatement} 