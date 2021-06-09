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
    this.router.post('/product/createproduct',productsController.createProduct)
    this.router.patch('/updateStatusProduct/:id',productsController.changeStatusProductActive)
    this.router.patch('/updateStatusProductDeactive/:id',productsController.changeStatusProductDeactive)
  }
}

export default new productRoutes().router