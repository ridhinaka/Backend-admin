import brandContoller from '../controller/brand-controller'
import { Router, Request, Response, IRoute } from 'express'
import IRoutes from '../routes/IRoutes'

class brandRoutes implements IRoutes {
  router : Router
  constructor() {
    this.router = Router()
    this.route()
  }

  route():void {
    this.router.post('/brand/createbrand',brandContoller.createBrand)
  }
}

export default new brandRoutes().router