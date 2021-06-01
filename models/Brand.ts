import mongoose from 'mongoose'

interface IBrand {
  brandName : string,
}
interface BrandDoc extends mongoose.Document {
  brandName : string,
}

interface BrandModel extends mongoose.Model <BrandDoc>{
  build(attr : IBrand): BrandDoc
}

const brandSchema = new mongoose.Schema ({
  brandName : {type: String, required:true, unique:true}
},
  {
    timestamps:true,
    versionKey :false
  })

const Brand = mongoose.model<BrandDoc, BrandModel> ('brandSchema', brandSchema)

export {Brand}