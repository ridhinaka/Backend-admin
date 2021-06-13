import { Request, Response, NextFunction } from "express";
import { Purchase } from "../models/PurchaseOrder";
import { Supplier } from "../models/Supplier";
import { User } from "../models/Users";
import { Product } from "../models/Product";

class purchaseController {
  constructor() {}

  static async getPurchase(req: Request, res: Response) {
    const findPurchaseOrder = await Purchase.find({})
    .populate('supplier_id')
    .populate('products.product_id')
    .populate('products.product_id.UOM_id')
    res.status(200).json({ msg: findPurchaseOrder });
  }

  static async getSpesificPurchase(req: Request, res: Response){
    const {id} = req.params
    try {
      const spesificPurchase = await Purchase.findById(id)
      .populate('supplier_id')
      .populate('products.product_id')
      .populate('products.product_id.UOM_id')
      res.status(200).json({msg:spesificPurchase})
    } catch (error) {
      res.status(500).json({msg:error})
    }
  }

  static async createPurchaseOrder(req: Request, res: Response) {
    const { id } = req.params;
    const { product_id, quantity, discount,supplier_id } = req.body;
    const findProduct = await Product.findById(product_id);
    try {
      const findUser = await User.findById((<any>req).Id);
      if (findUser.role === "inventory") {
        const findIdSupplier = await Purchase.findOne({ supplier_id: supplier_id });
        const checkAllProduct = await Purchase.findOne({
          product_id: product_id,
        });
        if (findIdSupplier === null || checkAllProduct === null) {
          const newPurchaseOrder = {
            codeOrder: req.body.codeOrder,
            discount: discount,
            products: [
              {
                supplier_id :supplier_id,
                product_id : product_id,
                quantity : quantity,
                totalOrder: findProduct.purchasePrice * quantity - discount,
              },
            ],
          };
        
          const create_purchaseOrder = await Purchase.create(newPurchaseOrder);
           await Purchase.findByIdAndUpdate(create_purchaseOrder._id,{$push:{productsDeliveryOrder:{product_id:product_id,totalOrder:findProduct.purchasePrice * quantity - discount,quantity:quantity}}},{new:true})
          const findSupplier = await Supplier.findOne({_id:supplier_id});
          const updateNewPO = await Purchase.findByIdAndUpdate(
            create_purchaseOrder._id,
            { $set: { supplier_id: findSupplier._id , supplier_name:findSupplier.supplierName} },
            { new: true }
          ).populate("products.product_id")
          .populate('products.product_id.UOM_id')
          res
            .status(201)
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
        const findPuchaseandUpdate = await Purchase.findByIdAndUpdate(id,{$push:{products:[{product_id:product_id,quantity:quantity,discount:discount,totalOrder : (findProduct.purchasePrice * quantity)}]}},{new:true}).populate('products.product_id').populate('products.product_id.UOM_id')
        const updatePurchaseDelivery = await Purchase.findByIdAndUpdate(findPuchaseandUpdate._id,{$push:{productsDeliveryOrder:{product_id:product_id,totalOrder:findProduct.purchasePrice * quantity - discount,quantity:quantity}}},{new:true})
        res.status(200).json({msg:updatePurchaseDelivery})
      
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
      await Purchase.findByIdAndUpdate(
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
