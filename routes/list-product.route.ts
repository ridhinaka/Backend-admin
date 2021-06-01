import { Router} from 'express'
import IRoutes from '../routes/IRoutes'
import listProductController from '../controller/list-product-controller'

class listProductRoutes implements IRoutes{
  router : Router
  constructor(){
    this.router = Router()
    this.route()
  }

  route():void {
    this.router.get('/createlistproduct',listProductController.getListProduct)
    this.router.post('/create/:id',listProductController.createFormProduct)
  }
}

export default new listProductRoutes().router