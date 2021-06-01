import { IRouter, Router } from 'express'
import IRoutes from '../routes/IRoutes'
import purchaseController from '../controller/purchaseOrder-controller'

class purchaseRoutes implements IRoutes{
  router : Router
  constructor (){
    this.router = Router()
    this.route()
  }

  route():void {
    this.router.get('/purchaseOrder',purchaseController.getPurchase)
    this.router.post('/create/purchaseOrder/:id',purchaseController.createPurchaseOrder)
  }
}

export default new purchaseRoutes().router