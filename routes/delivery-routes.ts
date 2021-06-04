import { Router} from 'express'
import IRoutes from '../routes/IRoutes'
import deliveryController from '../controller/delivery-order-controller'

class deliveryRoutes implements IRoutes{
  router : Router
  constructor(){
    this.router = Router()
    this.route()
  }

  route(): void {
    this.router.get('/delivery',deliveryController.getDeliveryOrder)
    this.router.post('/create/delivery/:id',deliveryController.createDeliveryOrder)
  }
}

export default new deliveryRoutes().router