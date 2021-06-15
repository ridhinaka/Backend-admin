import { Router } from 'express'
import IRoutes from '../routes/IRoutes'
import supplierController from '../controller/supplier-controller'

class supplierRoute implements IRoutes {
  router : Router 
  constructor (){
    this.router = Router()
    this.route()
  }

  route(): void {
    this.router.get('/supplier/getsupplier',supplierController.getSupplier)
    this.router.post('/supplier/create',supplierController.createSupplier)
  }
}

export default new supplierRoute().router