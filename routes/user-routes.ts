import { Router } from 'express'
import IRoutes from '../routes/IRoutes'
import userController from '../controller/user-controller'

class userRoutes implements IRoutes{
  router : Router
  constructor () {
    this.router = Router()
    this.route()
  }
  route(): void {
    this.router.get('/user', userController.getUser)
    this.router.get('/user/:id', userController.getUserID)
    this.router.post('/user/create', userController.createUser)
    this.router.post('/user/login',userController.loginUser)
    this.router.put('/user/forgetpass',userController.forgetPassword)
  }
}

export default new userRoutes().router