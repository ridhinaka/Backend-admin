import bcrypt from 'bcryptjs'
import {Request,Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import {User} from '../models/Users'

class userController {
  constructor (){}
  static async getUser (req: Request , res: Response) {
    const findUser = await User.find({})
    res.status(200).json({data:findUser})
  }

  static async createUser (req: Request, res: Response){
    const salt = bcrypt.genSaltSync(10);
    const newUser = {
      role : req.body.role,
      email : req.body.email,
      password : bcrypt.hashSync(req.body.password,salt),
      firstName : req.body.firstName,
      lastName : req.body.lastName,
      phoneNumber : req.body.phoneNumber
    }
    try {
      const verifUser = await User.findOne({email:req.body.email})
      if(verifUser){
        res.status(500).json({msg:"Email already exist"})
      }else{
        const findUser = await User.create(newUser)
      res.status(201).json({msg: "new user created", data: findUser})
      }
    } catch (error) {
      res.status(500).json({msg:"error anjing"})
    }
  }

  static async loginUser (req: Request, res: Response){

    try{
      const findEmail = await User.findOne({email:req.body.email})
      if(!findEmail){
        return res.status(500).json({msg: "user and password doesn't match"})
      }
      const passwordIsValid = bcrypt.compareSync(req.body.password, findEmail.password);
      if(!passwordIsValid){
        return res.status(500).json({message:"user and password doesnt match"})
      }
      const secretKey: string = (process.env.SECRET_KEY as string)
      const token:any = jwt.sign({ id: findEmail.id }, secretKey);
      res.status(200).json({ msg: "login succes", data: findEmail, accessToken: token });
    }
    catch(error){
      res.status(500).json({msg:"error cuk"})
    }
    
  }
}
export default userController