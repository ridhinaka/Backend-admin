import mongoose from 'mongoose'

interface ISupplier {
  inventory_id : string,
  supplierName : string,
  email : string,
  phone : string,
  gender : string,
  address : {
    street: string,
    city: string,
    state: string,
    country : string,
    postalCode : number
  }
}

interface SupplierDoc extends mongoose.Document {
  inventory_id : string,
  supplierName : string,
  email : string,
  phone : string,
  gender : string,
  address : {
    street: string,
    city: string,
    state: string,
    country : string,
    postalCode : number
  }
}

interface SupplierModel extends mongoose.Model <SupplierDoc>{
  build(attr : ISupplier) : SupplierDoc
}

const supplierSchema = new mongoose.Schema ({
  inventory_id : {type: mongoose.Types.ObjectId, ref:'userSchema'},
  supplierName : {type: String, required:true, unique: true},
  email : {type: String, required:true, unique: true},
  phone : {type: String, required:true, unique: true},
  gender : {type: String, required:true},
  address : {
    street : {type: String, required:true},
    city : {type: String, required:true},
    state : {type: String, required:true},
    country : {type: String, required:true},
    postalCode : {type: Number, required:true},
  }},
  {
    timestamps:true,
    versionKey :false
  })

  const Supplier = mongoose.model<SupplierDoc, SupplierModel> ('supplierSchema', supplierSchema)

  export {Supplier}