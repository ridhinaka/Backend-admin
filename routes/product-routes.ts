import { Router, Request, Response } from 'express'
import IRoutes from '../routes/IRoutes'
import productsController from '../controller/product-controller'

class productRoutes implements IRoutes{
  router : Router
  constructor () {
    this.router = Router()
    this.route()
  }
  route(): void {
    this.router.get('/product/getProduct', productsController.getProduct)
    this.router.get('/product/:id',productsController.getSpecificProduct)
    this.router.post('/product/createproduct',productsController.createProduct)
    this.router.put('/updateStatusProduct/:id',productsController.changeStatusProductActive)
  }
}

export default new productRoutes().router