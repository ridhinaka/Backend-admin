import { Router} from 'express'
import IRoutes from '../routes/IRoutes'
import UOMcontroller from '../controller/UOM-controller'

class UOMRoutes implements IRoutes{
  router : Router
  constructor (){
    this.router = Router()
    this.route()
  }
  route():void{
    this.router.get('/getUOM',UOMcontroller.getUOM)
    this.router.post('/UOM/create',UOMcontroller.createUOM)
  }
}

export default new UOMRoutes().router