import {Request,Response,NextFunction} from 'express'
import {User} from '../models/Users'

class EStatementController {

    static async createEStatement (req : Request, res : Response){
      const findUser = await User.findById((<any>req).Id)

      try {
        console.log(findUser)
      } catch (error) {
        res.status(500).json({msg:error})
      }
    }
}
export default EStatementController