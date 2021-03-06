import mongoose from 'mongoose'

interface IDelivery {
  id_product : string,
  deliveryCode : string,
  purchase_id : string,
  date : Date,
}

interface DeliveryDoc extends mongoose.Document {
  id_product : string,
  deliveryCode : string,
  purchase_id : string,
  date : Date,
}

interface DeliveryModel extends mongoose.Model <DeliveryDoc>{
  build(attr : IDelivery): DeliveryDoc
}

const deliveryschema = new mongoose.Schema({
  id_product : {type: mongoose.Types.ObjectId, ref: 'productSchema'},
  deliveryCode : {type :String,required:true},
  purchase_id : {type: mongoose.Types.ObjectId, ref:'purchaseSchema'},
  date : {type:Date, required:true}
},{
  timestamps:true,
  versionKey :false
})

const Delivery = mongoose.model<DeliveryDoc, DeliveryModel> ('deliverySchema',deliveryschema)

export {Delivery}