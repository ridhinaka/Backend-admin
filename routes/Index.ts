import { Router, Request, Response } from 'express'
import userRoutes from '../routes/user-routes'
import productRoutes from '../routes/product-routes'
import brandRoutes from '../routes/brand-routes'
import UOMRoutes from '../routes/UOM-routes'
import supplierRoute from '../routes/supplier-route'
import purchaseRoutes from '../routes/purchase-route'
import invoiceRoutes from '../routes/invoice-routes'
import deliveryRoutes from '../routes/delivery-routes'
import createOrderCashierRoutes from '../routes/createOrderCashier - routes'
import receivableRoutes from '../routes/receivable - routes'
import payableRoutes from '../routes/payable - routes'
import estatementRoutes from '../routes/eStatement-routes'
import authJwt from '../middlewares/auth'

class Routes {
  router : Router 
  constructor (){
    this.router = Router()
    this.routes()
    this.user()
    this.auth()
    this.brand()
    this.product()
    this.uom()
    this.supplier()
    this.purchase()
    this.delivery()
    this.invoice()
    this.createOrderCashier()
    this.receivable()
    this.payable()
    this.estatement()
  }
  public routes(): void {
    this.router.get("/", (req: Request, res: Response) => {
      res.status(200).json({ msg: "welcome to mobile legend" });
    })
  }

  public user(): void{
    this.router.use(userRoutes)
  }

  public auth() :void{
    this.router.use(authJwt.authentication)
  }

  public brand(): void {
    this.router.use(brandRoutes)
  }

  public product(): void{
    this.router.use(productRoutes)
  }
  public uom(): void{
    this.router.use(UOMRoutes)
  }

  public supplier(): void{
    this.router.use(supplierRoute)
  }

  public purchase(): void{
    this.router.use(purchaseRoutes)
  }

  public delivery(): void{
    this.router.use(deliveryRoutes)
  }

  public invoice(): void {
    this.router.use(invoiceRoutes)
  }
  public createOrderCashier(): void {
    this.router.use(createOrderCashierRoutes)
  }
  public receivable(): void {
    this.router.use(receivableRoutes)
  }
  public payable(): void {
    this.router.use(payableRoutes)
  }
  public estatement(): void {
    this.router.use(estatementRoutes)
  }

}

export default new Routes().router 