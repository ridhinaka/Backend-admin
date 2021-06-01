import mongoose from 'mongoose'

interface IListProduct {
  createProduct_id : string,
  UOM_id : string,
  stock : number,
  barcode : number,
}

interface ListProductDoc extends mongoose.Document {
  createProduct_id : string,
  UOM_id : string,
  stock : number,
  barcode : number,
}

interface ListProductModel extends mongoose.Model <ListProductDoc>{
  build(attr : IListProduct): ListProductDoc
}

const listProductSchema = new mongoose.Schema ({
  createProduct_id : {type: mongoose.Types.ObjectId, ref:'productSchema'},
  UOM_id : {type: mongoose.Types.ObjectId, ref:'UOMschema'},
  stock : {type: Number, required:true,default : 0},
  barcode : {type: Number, required:true},
},
  {
    timestamps:true,
    versionKey :false
  })

  const ListProduct = mongoose.model<ListProductDoc, ListProductModel> ('listProductSchema',listProductSchema)

  export {ListProduct}