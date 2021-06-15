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
var Users_1 = require("../models/Users");
var Product_1 = require("../models/Product");
var DeliveryOrder_1 = require("../models/DeliveryOrder");
var deliveryController = /** @class */ (function () {
    function deliveryController() {
    }
    deliveryController.getDeliveryOrder = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var findDeliveryOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, DeliveryOrder_1.Delivery.find({})
                            .populate('purchase_id')
                            .populate('id_product')
                            .populate('id_product.UOM_id')];
                    case 1:
                        findDeliveryOrder = _a.sent();
                        res.status(200).json({ msg: findDeliveryOrder });
                        return [2 /*return*/];
                }
            });
        });
    };
    deliveryController.createDeliveryOrder = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, deliveryCode, id_product, id_item, purchase_id, findUser, findPurchase, newDeliveryOrder, create_DO, update_DO, i, createDO, findPurchaseSpecific, i, updateStockProduct, findPurchaseForDelivery, i_1, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, deliveryCode = _a.deliveryCode, id_product = _a.id_product, id_item = _a.id_item, purchase_id = _a.purchase_id;
                        return [4 /*yield*/, Users_1.User.findById(req.Id)];
                    case 1:
                        findUser = _b.sent();
                        return [4 /*yield*/, PurchaseOrder_1.Purchase.findById(purchase_id)];
                    case 2:
                        findPurchase = _b.sent();
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 24, , 25]);
                        if (!(findUser.role === "inventory")) return [3 /*break*/, 23];
                        newDeliveryOrder = {
                            id_product: id_product,
                            purchase_id: purchase_id,
                            deliveryCode: deliveryCode,
                            date: req.body.date
                        };
                        return [4 /*yield*/, DeliveryOrder_1.Delivery.create(newDeliveryOrder)];
                    case 4:
                        create_DO = _b.sent();
                        if (!(create_DO && (!id_product === true))) return [3 /*break*/, 10];
                        return [4 /*yield*/, DeliveryOrder_1.Delivery.findByIdAndUpdate(create_DO._id, { $set: { purchase_id: purchase_id } }, { new: true })];
                    case 5:
                        update_DO = _b.sent();
                        i = 0;
                        _b.label = 6;
                    case 6:
                        if (!(i < findPurchase.products.length)) return [3 /*break*/, 9];
                        return [4 /*yield*/, Product_1.Product.findByIdAndUpdate(findPurchase.products[i].product_id, { $inc: { stock: findPurchase.products[i].quantity } }, { new: true })];
                    case 7:
                        _b.sent();
                        _b.label = 8;
                    case 8:
                        i++;
                        return [3 /*break*/, 6];
                    case 9:
                        res.status(201).json({ msg: "your DO have been created", data: update_DO });
                        return [3 /*break*/, 23];
                    case 10:
                        if (!(!id_product === false)) return [3 /*break*/, 23];
                        return [4 /*yield*/, DeliveryOrder_1.Delivery.create(newDeliveryOrder)];
                    case 11:
                        createDO = _b.sent();
                        return [4 /*yield*/, PurchaseOrder_1.Purchase.findById(purchase_id)];
                    case 12:
                        findPurchaseSpecific = _b.sent();
                        i = 0;
                        _b.label = 13;
                    case 13:
                        if (!(i < findPurchaseSpecific.products.length)) return [3 /*break*/, 22];
                        if (!(findPurchaseSpecific.products[i].product_id.toString() === id_product)) return [3 /*break*/, 20];
                        return [4 /*yield*/, Product_1.Product.findByIdAndUpdate(id_product, { $inc: { stock: findPurchaseSpecific.products[i].quantity } }, { new: true })];
                    case 14:
                        updateStockProduct = _b.sent();
                        if (!updateStockProduct) return [3 /*break*/, 19];
                        return [4 /*yield*/, PurchaseOrder_1.Purchase.findById(purchase_id)];
                    case 15:
                        findPurchaseForDelivery = _b.sent();
                        i_1 = 0;
                        _b.label = 16;
                    case 16:
                        if (!(i_1 < findPurchaseForDelivery.productsDeliveryOrder.length)) return [3 /*break*/, 19];
                        if (!(findPurchaseForDelivery.productsDeliveryOrder[i_1].product_id.toString() === id_product)) return [3 /*break*/, 18];
                        console.log("ini id", findPurchaseForDelivery.productsDeliveryOrder[i_1].product_id);
                        return [4 /*yield*/, PurchaseOrder_1.Purchase.findByIdAndUpdate(purchase_id, { $pull: { productsDeliveryOrder: { product_id: findPurchaseForDelivery.productsDeliveryOrder[i_1].product_id } } }, { multi: true })];
                    case 17:
                        _b.sent();
                        _b.label = 18;
                    case 18:
                        i_1++;
                        return [3 /*break*/, 16];
                    case 19: return [3 /*break*/, 21];
                    case 20:
                        res.status(500).json({ msg: "error" });
                        _b.label = 21;
                    case 21:
                        i++;
                        return [3 /*break*/, 13];
                    case 22:
                        res.status(201).json({ msg: createDO });
                        _b.label = 23;
                    case 23: return [3 /*break*/, 25];
                    case 24:
                        error_1 = _b.sent();
                        res.status(500).json({ msg: "cannot create PO", data: error_1 });
                        return [3 /*break*/, 25];
                    case 25: return [2 /*return*/];
                }
            });
        });
    };
    return deliveryController;
}());
exports.default = deliveryController;
