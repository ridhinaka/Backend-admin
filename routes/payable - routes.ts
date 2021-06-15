import { IRouter, Router } from 'express'
import IRoutes from '../routes/IRoutes'
import payableController from '../controller/payable-controller'

class payableRoutes implements IRoutes{
  router : Router
  constructor(){
    this.router = Router()
    this.route()
  }

  route():void{
    this.router.get('/getPayable',payableController.getPayable)
  }
}

export default new payableRoutes().router