import { Router, Request, Response } from 'express'
import IRoutes from '../routes/IRoutes'
import estatementController from  '../controller/eStatement - controller'

class estatementRoutes implements IRoutes {
  router : Router
  constructor(){
    this.router = Router()
    this.route()
  }

  route():void {
    // this.router.post('/memek',estatementController.create_estatement)
    this.router.get('/memek',estatementController.pukimak)
  }
}

export default new estatementRoutes().router