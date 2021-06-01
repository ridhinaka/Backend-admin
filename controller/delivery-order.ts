import {Request,Response,NextFunction} from 'express'
import {Purchase} from '../models/PurchaseOrder'
import {Supplier} from '../models/Supplier'
import {User} from '../models/Users'
import {Product} from '../models/Product'
import {Delivery} from '../models/DeliveryOrder'

class deliveryController {
  static async getDeliveryOrder (req: Request , res: Response) {
    const findDeliveryOrder = await Delivery.find({})
    res.status(200).json({msg:findDeliveryOrder})
  }

  static async createDeliveryOrder (req: Request , res: Response){
    
    const {id} = req.params
    const findUser = await User.findById((<any>req).Id)

    try {
      if(findUser.role === "inventory"){
        const newDeliveryOrder = {

        }
      }
    } catch (error) {
      
    }
  }
}