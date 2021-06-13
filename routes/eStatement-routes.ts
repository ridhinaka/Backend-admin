import { Router, Request, Response } from 'express'
import IRoutes from '../routes/IRoutes'
import EStatementController from '../controller/EstementController'

class estatementRoutes implements IRoutes {
  router : Router
  constructor(){
    this.router = Router()
    this.route()
  }

  route():void {
    this.router.get('/estatementCreate', EStatementController.createEStatement)
  }
}

export default new estatementRoutes().router