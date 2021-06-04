import { Request, Response, NextFunction } from "express";
import { Purchase } from "../models/PurchaseOrder";
import { Supplier } from "../models/Supplier";
import { User } from "../models/Users";
import { Product } from "../models/Product";

class purchaseController {
  constructor() {}

  static async getPurchase(req: Request, res: Response) {
    const findPurchaseOrder = await Purchase.find({});
    res.status(200).json({ msg: findPurchaseOrder });
  }

  static async createPurchaseOrder(req: Request, res: Response) {
    const { id } = req.params;
    const { product_id, quantity, discount } = req.body;
    const findProduct = await Product.findById(product_id);
    try {
      const findUser = await User.findById((<any>req).Id);
      if (findUser.role === "inventory") {
        const findIdSupplier = await Purchase.findOne({ supplier_id: id });
        const checkAllProduct = await Purchase.findOne({
          product_id: product_id,
        });
        if (findIdSupplier === null || checkAllProduct === null) {
          const newPurchaseOrder = {
            codeOrder: req.body.codeOrder,
            discount: discount,
            products: [
              {
                product_id: product_id,
                quantity: quantity,
                totalOrder: findProduct.purchasePrice * quantity - discount,
              },
            ],
          };
          const create_purchaseOrder = await Purchase.create(newPurchaseOrder);
          const findSupplier = await Supplier.findById(id);
          const updateNewPO = await Purchase.findByIdAndUpdate(
            create_purchaseOrder._id,
            { $set: { supplier_id: findSupplier._id } },
            { new: true }
          ).populate("product.product_id");
          console.log(updateNewPO);
          res
            .status(200)
            .json({ msg: "your PO have been created", data: updateNewPO });
        } else {
          if (checkAllProduct) {
            const findIdSupplierUpdate = await Purchase.findOneAndUpdate(
              { product_id: product_id },
              {
                $set: {
                  quantity: quantity,
                  totalOrder: findProduct.purchasePrice * quantity - discount,
                },
              },
              { new: true }
            );
            res.status(200).json({
              msg: "your PO have been created",
              data: findIdSupplierUpdate,
            });
          }
        }
      } else {
        res.status(500).json({ msg: "you are not allowed to create PO" });
      }
    } catch (error) {
      res.status(500).json({ msg: "cannot create PO", data: error });
    }
  }

  static async updatePurchase(req: Request, res: Response) {
    const { id } = req.params;
    const { product_id, quantity, discount } = req.body;
    const findProduct = await Product.findById(product_id);
    const findPurchase = await Purchase.findById(id);

    try {
//       const x  = await Purchase.aggregate([
//         {
//           $project: {
//             products: {
//               $filter: {
//                 input: "$products",
//                 as: "product",
//                 cond: { $eq: ["$$product.product_id",product_id] },
//               },
//             },
//           },
//         },
//       ]);
// console.log(x)
      console.log(findPurchase.products)
      for(let i = 0 ; i < findPurchase.products.length ; i ++){
        if(findPurchase.products[i].product_id.toString() === req.body.product_id){
        const findPuchaseandUpdate = await Purchase.findByIdAndUpdate(id,{$push:{products:[{product_id:product_id,quantity:quantity,discount:discount,totalOrder : (findProduct.purchasePrice * quantity)}]}},{new:true}).populate('product.product_id')
        res.status(200).json({msg:findPuchaseandUpdate})
        }else{
          res.status(500)
        }
      }
    } catch (error) {
      res.status(500).json({ msg: "cannot create PO", data: error });
    }
  }

  static async totalOrder(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const findPurchase = await Purchase.findById(id);
      let totalArray = [];
      for (let i = 0; i < findPurchase.products.length; i++) {
        let array = [];
        if (findPurchase.products[i]) {
          array.push(findPurchase.products[i].totalOrder);
          for (let j = 0; j < array.length; j++) {
            totalArray.push(array[j]);
          }
        }
      }
      let totalPO = 0;
      for (let k = 0; k < totalArray.length; k++) {
        totalPO += totalArray[k];
      }
      const newTotalPO = totalPO - findPurchase.discount;
      const updateTotalOrder = await Purchase.findByIdAndUpdate(
        id,
        { $set: { totalAmount: newTotalPO } },
        { new: true }
      );
      res.status(200).json({ msg: "your totalPO ", data: newTotalPO });
    } catch (error) {
      res.status(500).json({ msg: "cannot create PO", data: error });
    }
  }
}

export default purchaseController;
