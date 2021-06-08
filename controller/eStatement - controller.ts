import {Request,Response,NextFunction} from 'express'
import {User} from '../models/Users'
import {Receivable} from '../models/Receivable'
import {Payable} from '../models/Payable'
import {estatement} from '../models/E-Statement'

class estatementController {
  // static async create_estatement (res:Response, req: Request){
  //   const {id_payable,id_receivable} = req.body
  //   const findUser = await User.findById((<any>req).Id);
  //   console.log(findUser)
  //   try {
  //     if(findUser){
  //       const new_estatement = {
  //         id_payable : id_payable,
  //         id_receivable : id_receivable
  //       }
  //       console.log(await Payable.findById(id_payable))
  //       console.log(await Receivable.findById(id_receivable))
  //     const x = await estatement.create(new_estatement)
  //     const y = await estatement.findById(x._id).populate('id_payable','id_receivable')
  //     console.log(x)
  //     console.log(y)
  //     }
  //   } catch (error) {
  //     res.status(500).json({error})
  //   }
  // }
  static async pukimak (res:Response, req:Request){
    console.log("anjing")
    const findUser = await User.findById((<any>req).Id);

    console.log(findUser)
  }
}

export default estatementController