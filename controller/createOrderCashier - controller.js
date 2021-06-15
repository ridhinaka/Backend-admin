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
var Users_1 = require("../models/Users");
var Product_1 = require("../models/Product");
var CancelOrderCashier_1 = require("../models/CancelOrderCashier");
var CreateOrderCashier_1 = require("../models/CreateOrderCashier");
var Receivable_1 = require("../models/Receivable");
var createOrderCashierController = /** @class */ (function () {
    function createOrderCashierController() {
    }
    createOrderCashierController.getAllOrder = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var getAllActiveProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Product_1.Product.find({ productStatus: "active" })
                            .populate('productsCashier.cashierProduct_id')
                            .populate({
                            path: 'productsCashier.cashierProduct_id',
                            populate: {
                                path: 'UOM_id'
                            }
                        })];
                    case 1:
                        getAllActiveProduct = _a.sent();
                        res.status(200).json({ data: getAllActiveProduct });
                        return [2 /*return*/];
                }
            });
        });
    };
    createOrderCashierController.getAllOrderCashier = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var findAllOrder, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, CreateOrderCashier_1.CreateOrderCashier.find({})];
                    case 1:
                        findAllOrder = _a.sent();
                        res.status(200).json({ data: findAllOrder });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        res.status(500).json(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    createOrderCashierController.getSpecifiCashierOrder = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, findSpecificOrder, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, CreateOrderCashier_1.CreateOrderCashier.findById(id)
                                .populate('productsCashier.cashierProduct_id')
                                .populate({
                                path: 'productsCashier.cashierProduct_id',
                                populate: {
                                    path: 'UOM_id'
                                }
                            })];
                    case 2:
                        findSpecificOrder = _a.sent();
                        res.status(200).json({ data: findSpecificOrder });
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        res.status(500).json(error_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    createOrderCashierController.createOrder = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var findUser, _a, cashierProduct_id, quantity_product, findProduct, newCreateOrderCashier, createOrderCashier, newReceivable, populateProduct, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Users_1.User.findById(req.Id)];
                    case 1:
                        findUser = _b.sent();
                        _a = req.body, cashierProduct_id = _a.cashierProduct_id, quantity_product = _a.quantity_product;
                        return [4 /*yield*/, Product_1.Product.findById(cashierProduct_id)];
                    case 2:
                        findProduct = _b.sent();
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 10, , 11]);
                        if (!(findUser.role === "cashier")) return [3 /*break*/, 8];
                        newCreateOrderCashier = {
                            code_order_cashier: req.body.code_order_cashier,
                            productsCashier: [
                                {
                                    cashierProduct_id: cashierProduct_id,
                                    quantity_product: quantity_product,
                                    subTotal: findProduct.sellingPrice * quantity_product,
                                },
                            ],
                        };
                        return [4 /*yield*/, CreateOrderCashier_1.CreateOrderCashier.create(newCreateOrderCashier)];
                    case 4:
                        createOrderCashier = _b.sent();
                        if (!createOrderCashier) return [3 /*break*/, 6];
                        newReceivable = {
                            orderCashier_id: createOrderCashier._id,
                        };
                        return [4 /*yield*/, Receivable_1.Receivable.create(newReceivable)];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6: return [4 /*yield*/, CreateOrderCashier_1.CreateOrderCashier.findById(createOrderCashier._id).populate('productsCashier.cashierProduct_id')];
                    case 7:
                        populateProduct = _b.sent();
                        res.status(201).json({ msg: populateProduct });
                        return [3 /*break*/, 9];
                    case 8:
                        res.status(500).json({ msg: "you are not allowed to create order" });
                        _b.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        error_3 = _b.sent();
                        res.status(500).json({ msg: "salah" });
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    createOrderCashierController.addProductCashier = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, cashierProduct_id, quantity_product, findOrderCashier, findProduct, updateOrderCashier, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.params.id;
                        _a = req.body, cashierProduct_id = _a.cashierProduct_id, quantity_product = _a.quantity_product;
                        return [4 /*yield*/, CreateOrderCashier_1.CreateOrderCashier.findById(id)];
                    case 1:
                        findOrderCashier = _b.sent();
                        return [4 /*yield*/, Product_1.Product.findById(cashierProduct_id)];
                    case 2:
                        findProduct = _b.sent();
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 8, , 9]);
                        if (!findOrderCashier) return [3 /*break*/, 6];
                        return [4 /*yield*/, CreateOrderCashier_1.CreateOrderCashier.findByIdAndUpdate(id, { $push: { productsCashier: [{ cashierProduct_id: cashierProduct_id, quantity_product: quantity_product, subTotal: findProduct.sellingPrice }] } }, { new: true })];
                    case 4:
                        updateOrderCashier = _b.sent();
                        return [4 /*yield*/, Product_1.Product.findByIdAndUpdate(cashierProduct_id, { $inc: { stock: -quantity_product } }, { new: true })];
                    case 5:
                        _b.sent();
                        res.status(200).json({ msg: updateOrderCashier });
                        return [3 /*break*/, 7];
                    case 6:
                        res.status(500).json({ msg: "your order doesnt exist" });
                        _b.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_4 = _b.sent();
                        res.status(500);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    createOrderCashierController.getTotalOrderCashier = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, findCreateOrderCashier, totalArray, i, array, j, subTotalCashier, k, updateTotalOrder, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, CreateOrderCashier_1.CreateOrderCashier.findById(id)];
                    case 2:
                        findCreateOrderCashier = _a.sent();
                        totalArray = [];
                        for (i = 0; i < findCreateOrderCashier.productsCashier.length; i++) {
                            array = [];
                            if (findCreateOrderCashier.productsCashier[i]) {
                                array.push(findCreateOrderCashier.productsCashier[i].subTotal);
                                for (j = 0; j < array.length; j++) {
                                    totalArray.push(array[j]);
                                }
                            }
                        }
                        subTotalCashier = 0;
                        for (k = 0; k < totalArray.length; k++) {
                            subTotalCashier += totalArray[k];
                        }
                        return [4 /*yield*/, CreateOrderCashier_1.CreateOrderCashier.findByIdAndUpdate(id, { $set: { subTotalCashier: subTotalCashier, grandTotal: subTotalCashier } }, { new: true })];
                    case 3:
                        updateTotalOrder = _a.sent();
                        if (!updateTotalOrder) return [3 /*break*/, 5];
                        return [4 /*yield*/, Receivable_1.Receivable.findOneAndUpdate({ orderCashier_id: updateTotalOrder._id }, { $set: { grandTotal: subTotalCashier } }, { new: true })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        res.status(200).json({ msg: "your subTotalCashier ", data: subTotalCashier });
                        return [3 /*break*/, 7];
                    case 6:
                        error_5 = _a.sent();
                        res.status(500);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    createOrderCashierController.taxOrder = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, findOrderCashier_id, isTax, newSubTotal, isTaxOrder, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, CreateOrderCashier_1.CreateOrderCashier.findById(id)];
                    case 1:
                        findOrderCashier_id = _a.sent();
                        isTax = findOrderCashier_id.subTotalCashier * (10 / 100);
                        newSubTotal = findOrderCashier_id.subTotalCashier + isTax;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 8, , 9]);
                        if (!findOrderCashier_id) return [3 /*break*/, 6];
                        return [4 /*yield*/, CreateOrderCashier_1.CreateOrderCashier.findByIdAndUpdate(id, { $set: { subTotalTax: newSubTotal, grandTotal: newSubTotal } }, { new: true })];
                    case 3:
                        isTaxOrder = _a.sent();
                        if (!isTaxOrder) return [3 /*break*/, 5];
                        return [4 /*yield*/, Receivable_1.Receivable.findOneAndUpdate({ orderCashier_id: isTaxOrder._id }, { $set: { grandTotal: newSubTotal } }, { new: true })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        res.status(200).json({ msg: "your total order are", isTaxOrder: isTaxOrder });
                        return [3 /*break*/, 7];
                    case 6:
                        res.status(500).json({ msg: "your order doesnt exist" });
                        _a.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_6 = _a.sent();
                        res.status(500);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    createOrderCashierController.noTaxOrder = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, findOrderCashier_id, isTax, newSubTotalNoTax, isNoTaxOrder, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, CreateOrderCashier_1.CreateOrderCashier.findById(id)];
                    case 1:
                        findOrderCashier_id = _a.sent();
                        isTax = findOrderCashier_id.subTotalCashier * (10 / 100);
                        newSubTotalNoTax = findOrderCashier_id.subTotalTax - isTax;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 8, , 9]);
                        if (!findOrderCashier_id) return [3 /*break*/, 6];
                        return [4 /*yield*/, CreateOrderCashier_1.CreateOrderCashier.findByIdAndUpdate(id, { $set: { subTotalNoTax: newSubTotalNoTax, grandTotal: newSubTotalNoTax } }, { new: true })];
                    case 3:
                        isNoTaxOrder = _a.sent();
                        if (!isNoTaxOrder) return [3 /*break*/, 5];
                        return [4 /*yield*/, Receivable_1.Receivable.findOneAndUpdate({ orderCashier_id: isNoTaxOrder._id }, { $set: { grandTotal: newSubTotalNoTax } }, { new: true })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        res.status(200).json({ msg: "your total order are", isNoTaxOrder: isNoTaxOrder });
                        return [3 /*break*/, 7];
                    case 6:
                        res.status(500).json({ msg: "your order doesnt exist" });
                        _a.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_7 = _a.sent();
                        res.status(500);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    createOrderCashierController.cancelOrder = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, findOrderCashier, newCancel, createCancelOrder, updateStatusOrderCashier, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, CreateOrderCashier_1.CreateOrderCashier.findById(id)];
                    case 1:
                        findOrderCashier = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 9, , 10]);
                        if (!findOrderCashier) return [3 /*break*/, 7];
                        newCancel = {
                            orderCashier_id: id,
                            reason: req.body.reason,
                            codeOrder: findOrderCashier.code_order_cashier
                        };
                        return [4 /*yield*/, CancelOrderCashier_1.Cancel.create(newCancel)];
                    case 3:
                        createCancelOrder = _a.sent();
                        if (!createCancelOrder) return [3 /*break*/, 6];
                        return [4 /*yield*/, CreateOrderCashier_1.CreateOrderCashier.findByIdAndUpdate(id, { $set: { status: "cancel order" } }, { new: true })];
                    case 4:
                        updateStatusOrderCashier = _a.sent();
                        return [4 /*yield*/, Receivable_1.Receivable.findOneAndRemove({ orderCashier_id: updateStatusOrderCashier._id })];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        res.status(200).json({ msg: "your order have been canceled", data: createCancelOrder });
                        return [3 /*break*/, 8];
                    case 7:
                        res.status(500).json({ msg: "your order doesnt exist" });
                        _a.label = 8;
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        error_8 = _a.sent();
                        res.status(500).json({ msg: "your order have been cancelled already" });
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    createOrderCashierController.getTopListProduct = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var inputDateFrom, inputDateUntill, date_from, date_to, rangeDate, findAllCashierTransactions, i, j, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        inputDateFrom = req.body.dateFrom;
                        inputDateUntill = req.body.dateTo;
                        date_from = inputDateFrom + "T00:00:00.0000";
                        date_to = inputDateUntill + "T23:59:59.0000";
                        rangeDate = { $gte: date_from, $lte: date_to };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, CreateOrderCashier_1.CreateOrderCashier.find({ createdAt: rangeDate })];
                    case 2:
                        findAllCashierTransactions = _a.sent();
                        for (i = 0; i < findAllCashierTransactions.length; i++) {
                            for (j = 0; j < findAllCashierTransactions[i].productsCashier.length; j++) {
                                console.log(findAllCashierTransactions[i].productsCashier[j].quantity_product);
                            }
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_9 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return createOrderCashierController;
}());
exports.default = createOrderCashierController;
