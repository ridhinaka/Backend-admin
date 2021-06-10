import mongoose from 'mongoose'

interface IUOM {
  UOM_name : string,
}
interface UOMDoc extends mongoose.Document {
  UOM_name : string,
}

interface UOMModel extends mongoose.Model <UOMDoc>{
  build(attr : IUOM): UOMDoc
}

const UOMschema = new mongoose.Schema ({
  UOM_name : {type: String, required:true, unique:true}
},
  {
    timestamps:true,
    versionKey :false
  })

const UOM = mongoose.model<UOMDoc, UOMModel> ('UOM', UOMschema)

export {UOM}