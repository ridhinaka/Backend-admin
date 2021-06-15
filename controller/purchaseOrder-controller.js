"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var PurchaseOrder_1 = require("../models/PurchaseOrder");
var Supplier_1 = require("../models/Supplier");
var Users_1 = require("../models/Users");
var Product_1 = require("../models/Product");
var purchaseController = /** @class */ (function () {
    function purchaseController() {
    }
    purchaseController.getPurchase = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var findPurchaseOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, PurchaseOrder_1.Purchase.find({})
                            .populate('supplier_id')
                            .populate('products.product_id')
                            .populate({
                            path: 'products.product_id',
                            populate: {
                                path: 'UOM_id'
                            }
                        })];
                    case 1:
                        findPurchaseOrder = _a.sent();
                        res.status(200).json({ msg: findPurchaseOrder });
                        return [2 /*return*/];
                }
            });
        });
    };
    purchaseController.getSpesificPurchase = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, spesificPurchase, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, PurchaseOrder_1.Purchase.findById(id)
                                .populate('supplier_id')
                                .populate('products.product_id')
                                .populate('products.product_id.UOM_id')];
                    case 2:
                        spesificPurchase = _a.sent();
                        res.status(200).json({ msg: spesificPurchase });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        res.status(500).json({ msg: error_1 });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    purchaseController.createPurchaseOrder = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, product_id, quantity, discount, supplier_id, findProduct, findUser, findIdSupplier, checkAllProduct, newPurchaseOrder, create_purchaseOrder, findSupplier, updateNewPO, findIdSupplierUpdate, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.params.id;
                        _a = req.body, product_id = _a.product_id, quantity = _a.quantity, discount = _a.discount, supplier_id = _a.supplier_id;
                        return [4 /*yield*/, Product_1.Product.findById(product_id)];
                    case 1:
                        findProduct = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 15, , 16]);
                        return [4 /*yield*/, Users_1.User.findById(req.Id)];
                    case 3:
                        findUser = _b.sent();
                        if (!(findUser.role === "inventory")) return [3 /*break*/, 13];
                        return [4 /*yield*/, PurchaseOrder_1.Purchase.findOne({ supplier_id: supplier_id })];
                    case 4:
                        findIdSupplier = _b.sent();
                        return [4 /*yield*/, PurchaseOrder_1.Purchase.findOne({
                                product_id: product_id,
                            })];
                    case 5:
                        checkAllProduct = _b.sent();
                        if (!(findIdSupplier === null || checkAllProduct === null)) return [3 /*break*/, 10];
                        newPurchaseOrder = {
                            codeOrder: req.body.codeOrder,
                            discount: discount,
                            products: [
                                {
                                    supplier_id: supplier_id,
                                    product_id: product_id,
                                    quantity: quantity,
                                    totalOrder: findProduct.purchasePrice * quantity - discount,
                                },
                            ],
                        };
                        return [4 /*yield*/, PurchaseOrder_1.Purchase.create(newPurchaseOrder)];
                    case 6:
                        create_purchaseOrder = _b.sent();
                        return [4 /*yield*/, PurchaseOrder_1.Purchase.findByIdAndUpdate(create_purchaseOrder._id, { $push: { productsDeliveryOrder: { product_id: product_id, totalOrder: findProduct.purchasePrice * quantity - discount, quantity: quantity } } }, { new: true })];
                    case 7:
                        _b.sent();
                        return [4 /*yield*/, Supplier_1.Supplier.findOne({ _id: supplier_id })];
                    case 8:
                        findSupplier = _b.sent();
                        return [4 /*yield*/, PurchaseOrder_1.Purchase.findByIdAndUpdate(create_purchaseOrder._id, { $set: { supplier_id: findSupplier._id, supplier_name: findSupplier.supplierName } }, { new: true }).populate("products.product_id")
                                .populate('products.product_id.UOM_id')];
                    case 9:
                        updateNewPO = _b.sent();
                        res
                            .status(201)
                            .json({ msg: "your PO have been created", data: updateNewPO });
                        return [3 /*break*/, 12];
                    case 10:
                        if (!checkAllProduct) return [3 /*break*/, 12];
                        return [4 /*yield*/, PurchaseOrder_1.Purchase.findOneAndUpdate({ product_id: product_id }, {
                                $set: {
                                    quantity: quantity,
                                    totalOrder: findProduct.purchasePrice * quantity - discount,
                                },
                            }, { new: true })];
                    case 11:
                        findIdSupplierUpdate = _b.sent();
                        res.status(200).json({
                            msg: "your PO have been created",
                            data: findIdSupplierUpdate,
                        });
                        _b.label = 12;
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        res.status(500).json({ msg: "you are not allowed to create PO" });
                        _b.label = 14;
                    case 14: return [3 /*break*/, 16];
                    case 15:
                        error_2 = _b.sent();
                        res.status(500).json({ msg: "cannot create PO", data: error_2 });
                        return [3 /*break*/, 16];
                    case 16: return [2 /*return*/];
                }
            });
        });
    };
    purchaseController.updatePurchase = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, product_id, quantity, discount, findProduct, findPurchase, findPuchaseandUpdate, updatePurchaseDelivery, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.params.id;
                        _a = req.body, product_id = _a.product_id, quantity = _a.quantity, discount = _a.discount;
                        return [4 /*yield*/, Product_1.Product.findById(product_id)];
                    case 1:
                        findProduct = _b.sent();
                        return [4 /*yield*/, PurchaseOrder_1.Purchase.findById(id)];
                    case 2:
                        findPurchase = _b.sent();
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 6, , 7]);
                        return [4 /*yield*/, PurchaseOrder_1.Purchase.findByIdAndUpdate(id, { $push: { products: [{ product_id: product_id, quantity: quantity, discount: discount, totalOrder: (findProduct.purchasePrice * quantity) }] } }, { new: true }).populate('products.product_id').populate('products.product_id.UOM_id')];
                    case 4:
                        findPuchaseandUpdate = _b.sent();
                        return [4 /*yield*/, PurchaseOrder_1.Purchase.findByIdAndUpdate(findPuchaseandUpdate._id, { $push: { productsDeliveryOrder: { product_id: product_id, totalOrder: findProduct.purchasePrice * quantity - discount, quantity: quantity } } }, { new: true })];
                    case 5:
                        updatePurchaseDelivery = _b.sent();
                        res.status(200).json({ msg: updatePurchaseDelivery });
                        return [3 /*break*/, 7];
                    case 6:
                        error_3 = _b.sent();
                        res.status(500).json({ msg: "cannot create PO", data: error_3 });
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    purchaseController.totalOrder = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, findPurchase, totalArray, i, array, j, totalPO, k, newTotalPO, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, PurchaseOrder_1.Purchase.findById(id)];
                    case 2:
                        findPurchase = _a.sent();
                        totalArray = [];
                        for (i = 0; i < findPurchase.products.length; i++) {
                            array = [];
                            if (findPurchase.products[i]) {
                                array.push(findPurchase.products[i].totalOrder);
                                for (j = 0; j < array.length; j++) {
                                    totalArray.push(array[j]);
                                }
                            }
                        }
                        totalPO = 0;
                        for (k = 0; k < totalArray.length; k++) {
                            totalPO += totalArray[k];
                        }
                        newTotalPO = totalPO - findPurchase.discount;
                        return [4 /*yield*/, PurchaseOrder_1.Purchase.findByIdAndUpdate(id, { $set: { totalAmount: newTotalPO } }, { new: true })];
                    case 3:
                        _a.sent();
                        res.status(200).json({ msg: "your totalPO ", data: newTotalPO });
                        return [3 /*break*/, 5];
                    case 4:
                        error_4 = _a.sent();
                        res.status(500).json({ msg: "cannot create PO", data: error_4 });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return purchaseController;
}());
exports.default = purchaseController;
