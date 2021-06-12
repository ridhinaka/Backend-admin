import { Router, Request, Response } from 'express'
import IRoutes from '../routes/IRoutes'
import invoiceController from '../controller/invoice-controller'

class invoiceRoutes implements IRoutes {
  router: Router
  constructor () {
    this.router = Router()
    this.route()
  }

  route() : void {
    this.router.get('/invoice',invoiceController.getInvoice)
    this.router.get('/invoice/:id',invoiceController.getSpecificInvoice)
    this.router.post('/invoice/create',invoiceController.createInvoice)
    this.router.post('/invoice/changeStatus/:id',invoiceController.changeStatus)
    this.router.post('/invoice/changeStatusTest/:id',invoiceController.changeStatusTest)
  }
}

export default new invoiceRoutes().router