import { IRouter, Router } from 'express'
import IRoutes from '../routes/IRoutes'
import receivableController from '../controller/receivable - controller'

class receivableRoutes implements IRoutes{
  router : Router
  constructor(){
    this.router = Router()
    this.route()
  }

  route():void{
    this.router.get('/getReceivable',receivableController.getAllReceivable)
  }
}

export default new receivableRoutes().router