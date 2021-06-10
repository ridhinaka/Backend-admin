import mongoose from 'mongoose'

interface IProduct {
  brand_id : string,
  UOM_id : string,
  productName : string,
  productImage : string,
  sellingPrice : number,
  purchasePrice : number,
  productStatus : string,
  code_product : number,
  stock: number
}
interface ProductDoc extends mongoose.Document {
  brand_id : string,
  UOM_id : string,
  productName : string,
  productImage : string,
  sellingPrice : number,
  purchasePrice : number,
  productStatus : string,
  code_product : number,
  stock : number
}

interface ProductModel extends mongoose.Model <ProductDoc>{
  build(attr : IProduct): ProductDoc
}

const productSchema = new mongoose.Schema ({
  brand_id : {type:mongoose.Types.ObjectId, ref: 'brandSchema'},
  UOM_id : {type:mongoose.Types.ObjectId, ref: 'UOM'},
  productName :  {type: String, required:true},
  productImage : {type: String, required:true},
  sellingPrice : {type: Number, required:true} ,
  purchasePrice : {type: Number, required:true},
  productStatus : {type: String,required:true,default:"deactive"},
  code_product : {type: Number, required:true},
  stock: {type: Number, default:0},
},
  {
    timestamps:true,
    versionKey :false
  })

const Product = mongoose.model<ProductDoc, ProductModel> ('productSchema', productSchema)

export {Product}