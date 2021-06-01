import {Request,Response,NextFunction} from 'express'
import {ListProduct} from '../models/ListProduct'
import {User} from '../models/Users'
import {Product} from '../models/Product'

class listProductController {
  static async getListProduct (req: Request , res: Response) {
    const findListProduct = await ListProduct.find({})
    res.status(200).json({msg:findListProduct})
  }

  static async createFormProduct (req: Request , res: Response)  {
    const findUser = await User.findById((<any>req).Id)
    const {id} = req.params
    try {
      if(findUser.role === "inventory"){
        const newListProduct = {
          UOM_id : req.body.UOM_id,
          barcode : req.body.barcode
        }
        await Product.findById(id)
        
        const filterListProduct:any = await (await ListProduct.find({createProduct_id:id,UOM_id:req.body.UOM_id})).forEach(function(doc){})
        console.log(filterListProduct === true)    
        if(filterListProduct){
          console.log(!filterListProduct)
          const createListProduct = await ListProduct.create(newListProduct)
          const updateListProduct = await ListProduct.findByIdAndUpdate(createListProduct._id,{$set:{createProduct_id:id}},{new:true}).populate('createProduct_id')
          res.status(200).json({msg:"your product have been created",data:updateListProduct})
        }else if(!filterListProduct === false){
          console.log("anjing anjing")
          const condition = (filterListProduct.UOM_id.toString()  === req.body.UOM_id) && filterListProduct.createProduct_id.toString() === id
          if(condition === true){
            res.status(500).json({msg: "your product already exist"})
          }else{
            const x = await ListProduct.findOne({UOM_id:req.body.UOM_id})
            // for(let i = 0 ; i < x.length; i ++){
            
            // }
              // const createListProduct = await ListProduct.create(newListProduct)
              // const updateListProduct = await ListProduct.findByIdAndUpdate(createListProduct._id,{$set:{createProduct_id:id}},{new:true}).populate('createProduct_id')
              // res.status(200).json({msg:"your product have been created",data:updateListProduct})
          
          }
        }
      }
    } catch (error) {
      res.status(500).json({msg:error})
    }
  }
}

export default listProductController