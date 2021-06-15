import { Router} from 'express'
import IRoutes from './IRoutes'
import createOrderCashierController from '../controller/createOrderCashier - controller'

class createOrderCashierRoutes implements IRoutes {
  router : Router
  constructor() {
    this.router = Router()
    this.route()
  }

  route():void {
    this.router.get('/getOrderCashier',createOrderCashierController.getAllOrder)
    this.router.get('/getOrderTotalCashier',createOrderCashierController.getAllOrderCashier)
    this.router.get('/getSpecifiCashierOrder/:id',createOrderCashierController.getSpecifiCashierOrder)
    this.router.get('/getSubTotal/:id',createOrderCashierController.getTotalOrderCashier)
    this.router.get('/isTax/:id',createOrderCashierController.taxOrder)
    this.router.get('/noTaxOrder/:id',createOrderCashierController.noTaxOrder)
    this.router.post('/createOrderCashier',createOrderCashierController.createOrder)
    this.router.post('/addProduct/:id',createOrderCashierController.addProductCashier)
    this.router.post('/cancelOrder/:id',createOrderCashierController.cancelOrder)
    this.router.put('/toplistProduct', createOrderCashierController.getTopListProduct)
  }

}

export default new createOrderCashierRoutes().router