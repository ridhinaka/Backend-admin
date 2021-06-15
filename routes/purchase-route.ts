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
    this.router.post('/create/purchaseOrder',purchaseController.createPurchaseOrder)
    this.router.post('/updatePurchase/:id',purchaseController.updatePurchase)
    this.router.get('/getTotalOrder/:id',purchaseController.totalOrder)
    this.router.get('/getSpesificPurchase/:id', purchaseController.getSpesificPurchase)
  }
}

export default new purchaseRoutes().router