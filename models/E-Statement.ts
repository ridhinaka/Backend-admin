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
  status : boolean,
  dateFrom : string,
  dateTo : string
}

interface estatementModel extends mongoose.Model <estatementDoc>{
  build(attr : Iestatement) : estatementDoc
}

const estatementSchema = new mongoose.Schema({
  codeEstatement : {type:String, required:true,unique:true},
  totalPayable : {type: Number},
  totalReceivable : {type: Number},
  revenue: {type: Number},
  status : {type:Boolean,default:null},
  dateFrom : {type: String},
  dateTo : {type: String}
},{
  timestamps:true,
  versionKey :false
})

const estatement = mongoose.model<estatementDoc, estatementModel>('estatementSchema', estatementSchema)

export {estatement} 