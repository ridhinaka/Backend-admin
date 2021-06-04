import mongoose from 'mongoose'

interface IDelivery {
  id_product : string,
  id_item : string,
  deliveryCode : string,
  purchase_id : string,
}

interface DeliveryDoc extends mongoose.Document {
  id_product : string,
  id_item : string,
  deliveryCode : string,
  purchase_id : string,
}

interface DeliveryModel extends mongoose.Model <DeliveryDoc>{
  build(attr : IDelivery): DeliveryDoc
}

const deliveryschema = new mongoose.Schema({
  id_product : {type: mongoose.Types.ObjectId, ref: 'purchaseSchema'},
  id_item : {type: mongoose.Types.ObjectId, ref: 'purchaseSchema'},
  deliveryCode : {type :String,required:true,unique:true},
  purchase_id : {type: mongoose.Types.ObjectId, ref:'purchaseSchema'}
},{
  timestamps:true,
  versionKey :false
})

const Delivery = mongoose.model<DeliveryDoc, DeliveryModel> ('deliverySchema',deliveryschema)

export {Delivery}