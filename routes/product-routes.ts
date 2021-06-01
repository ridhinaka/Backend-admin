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
    this.router.post('/product/createproduct/:id',productsController.createProduct)
  }
}

export default new productRoutes().router