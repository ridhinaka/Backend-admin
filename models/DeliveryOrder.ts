import mongoose from 'mongoose'

interface IDelivery {
  product_id : string,
  purchase_order_id : string,
  quantity : number,
  deliveryCode : string,
}

interface DeliveryDoc extends mongoose.Document {
  product_id : string,
  purchase_order_id : string,
  quantity : number,
  deliveryCode : string,
}

interface DeliveryModel extends mongoose.Model <DeliveryDoc>{
  build(attr : IDelivery): DeliveryDoc
}

const deliveryschema = new mongoose.Schema({
  product_id : {type: mongoose.Types.ObjectId, ref:'productSchemas'},
  purchase_order_id :{type: mongoose.Types.ObjectId, ref:'purchaseSchemas'},
  quantity : {type : Number,required:true},
  deliveryCode : {type :String,required:true,unique:true}
})

const Delivery = mongoose.model<DeliveryDoc, DeliveryModel> ('deliverySchema',deliveryschema)

export {Delivery}