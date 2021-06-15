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
var productsController = /** @class */ (function () {
    function productsController() {
    }
    productsController.getProduct = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var findProduct, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Product_1.Product.find({})
                                .populate('brand_id')
                                .populate('UOM_id')];
                    case 1:
                        findProduct = _a.sent();
                        res.status(200).json({ data: findProduct });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        res.status(500).json({ msg: error_1 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    productsController.getSpecificProduct = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, specificProduct, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Product_1.Product.findById(id)
                                .populate('brand_id')
                                .populate('UOM_id')];
                    case 2:
                        specificProduct = _a.sent();
                        res.status(200).json({ msg: specificProduct });
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        res.status(500).json({ msg: error_2 });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    productsController.createProduct = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, brand_id, UOM_id, findUser, newProduct, findBarcode, findProduct, create_product, findBYID, finOne, create_product, updateStatusProduct, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.params.id;
                        _a = req.body, brand_id = _a.brand_id, UOM_id = _a.UOM_id;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 15, , 16]);
                        return [4 /*yield*/, Users_1.User.findById(req.Id)];
                    case 2:
                        findUser = _b.sent();
                        if (!(findUser.role === "inventory")) return [3 /*break*/, 14];
                        newProduct = {
                            brand_id: brand_id,
                            UOM_id: UOM_id,
                            productName: req.body.productName,
                            productImage: req.body.productImage,
                            sellingPrice: req.body.sellingPrice,
                            purchasePrice: req.body.purchasePrice,
                            code_product: req.body.code_product
                        };
                        return [4 /*yield*/, Product_1.Product.findOne({ code_product: req.body.code_product })];
                    case 3:
                        findBarcode = _b.sent();
                        return [4 /*yield*/, Product_1.Product.find({ productName: req.body.productName, UOM_id: req.body.UOM_id })];
                    case 4:
                        findProduct = _b.sent();
                        if (!(findProduct.toString() === "")) return [3 /*break*/, 9];
                        if (!!findBarcode) return [3 /*break*/, 7];
                        return [4 /*yield*/, Product_1.Product.create(newProduct)];
                    case 5:
                        create_product = _b.sent();
                        return [4 /*yield*/, Product_1.Product.findById(create_product._id)
                                .populate('brand_id')
                                .populate('UOM_id')];
                    case 6:
                        findBYID = _b.sent();
                        res.status(201).json({ msg: findBYID });
                        return [3 /*break*/, 8];
                    case 7:
                        res.status(500).json({ msg: "barcode already exist" });
                        _b.label = 8;
                    case 8: return [3 /*break*/, 14];
                    case 9:
                        if (!findProduct) return [3 /*break*/, 14];
                        return [4 /*yield*/, Product_1.Product.findOne({ code_product: req.body.code_product })];
                    case 10:
                        finOne = _b.sent();
                        if (!((finOne.productName === req.body.productName) && ((finOne.UOM_id).toString() === req.body.UOM_id) && (finOne.code_product === parseInt(req.body.code_product)))) return [3 /*break*/, 11];
                        res.status(500).json({ msg: "product already exist" });
                        return [3 /*break*/, 14];
                    case 11: return [4 /*yield*/, Product_1.Product.create(newProduct)];
                    case 12:
                        create_product = _b.sent();
                        return [4 /*yield*/, Product_1.Product.findById(create_product._id)
                                .populate('brand_id')
                                .populate('UOM_id')];
                    case 13:
                        updateStatusProduct = _b.sent();
                        res.status(201).json({ msg: updateStatusProduct });
                        _b.label = 14;
                    case 14: return [3 /*break*/, 16];
                    case 15:
                        error_3 = _b.sent();
                        res.status(500).json({ msg: "cannot create product", data: error_3 });
                        return [3 /*break*/, 16];
                    case 16: return [2 /*return*/];
                }
            });
        });
    };
    productsController.uploadProduct = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, brand_id, UOM_id, findUser, newProduct, findBarcode, findProduct, create_product, findBYID, finOne, create_product, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.params.id;
                        _a = req.body, brand_id = _a.brand_id, UOM_id = _a.UOM_id;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 14, , 15]);
                        return [4 /*yield*/, Users_1.User.findById(req.Id)];
                    case 2:
                        findUser = _b.sent();
                        if (!(findUser.role === "inventory")) return [3 /*break*/, 13];
                        newProduct = {
                            brand_id: brand_id,
                            UOM_id: UOM_id,
                            productImage: req.file.path,
                            productName: req.body.productName,
                            sellingPrice: req.body.sellingPrice,
                            purchasePrice: req.body.purchasePrice,
                            code_product: req.body.code_product
                        };
                        return [4 /*yield*/, Product_1.Product.findOne({ code_product: req.body.code_product })];
                    case 3:
                        findBarcode = _b.sent();
                        return [4 /*yield*/, Product_1.Product.find({ productName: req.body.productName, UOM_id: req.body.UOM_id })];
                    case 4:
                        findProduct = _b.sent();
                        if (!(findProduct.toString() === "")) return [3 /*break*/, 9];
                        if (!!findBarcode) return [3 /*break*/, 7];
                        return [4 /*yield*/, Product_1.Product.create(newProduct)];
                    case 5:
                        create_product = _b.sent();
                        return [4 /*yield*/, Product_1.Product.findById(create_product._id)
                                .populate('brand_id')
                                .populate('UOM_id')];
                    case 6:
                        findBYID = _b.sent();
                        res.status(201).json({ msg: findBYID });
                        return [3 /*break*/, 8];
                    case 7:
                        res.status(500).json({ msg: "barcode already exist" });
                        _b.label = 8;
                    case 8: return [3 /*break*/, 13];
                    case 9:
                        if (!findProduct) return [3 /*break*/, 13];
                        return [4 /*yield*/, Product_1.Product.findOne({ code_product: req.body.code_product })];
                    case 10:
                        finOne = _b.sent();
                        if (!((finOne.productName === req.body.productName) && ((finOne.UOM_id).toString() === req.body.UOM_id) && (finOne.code_product === parseInt(req.body.code_product)))) return [3 /*break*/, 11];
                        res.status(500).json({ msg: "product already exist" });
                        return [3 /*break*/, 13];
                    case 11: return [4 /*yield*/, Product_1.Product.create(newProduct)];
                    case 12:
                        create_product = _b.sent();
                        res.status(201).json({ msg: create_product });
                        _b.label = 13;
                    case 13: return [3 /*break*/, 15];
                    case 14:
                        error_4 = _b.sent();
                        console.log(error_4);
                        res.status(500).json({ msg: "cannot create product", data: error_4 });
                        return [3 /*break*/, 15];
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    productsController.changeStatusProductActive = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, findProduct, updateActiveProduct, updateActiveProduct, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, Product_1.Product.findById(id)];
                    case 1:
                        findProduct = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 8, , 9]);
                        if (!(findProduct.productStatus === "deactive")) return [3 /*break*/, 4];
                        return [4 /*yield*/, Product_1.Product.findByIdAndUpdate(id, { $set: { productStatus: "active" } }, { new: true })];
                    case 3:
                        updateActiveProduct = _a.sent();
                        res.status(200).json({ msg: updateActiveProduct });
                        return [3 /*break*/, 7];
                    case 4:
                        if (!(findProduct.productStatus === "active")) return [3 /*break*/, 6];
                        return [4 /*yield*/, Product_1.Product.findByIdAndUpdate(id, { $set: { productStatus: "deactive" } }, { new: true })];
                    case 5:
                        updateActiveProduct = _a.sent();
                        res.status(200).json({ msg: updateActiveProduct });
                        return [3 /*break*/, 7];
                    case 6:
                        res.status(500).json({ msg: "your product doesnt exist" });
                        _a.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_5 = _a.sent();
                        res.status(500).json({ msg: error_5 });
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    productsController.changeStatusProductDeactive = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, findProduct, updateDeactiveProduct, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, Product_1.Product.findById(id)];
                    case 1:
                        findProduct = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 6, , 7]);
                        if (!findProduct) return [3 /*break*/, 4];
                        return [4 /*yield*/, Product_1.Product.findByIdAndUpdate(id, { $set: { productStatus: "deactive" } }, { new: true })];
                    case 3:
                        updateDeactiveProduct = _a.sent();
                        res.status(200).json({ msg: updateDeactiveProduct });
                        return [3 /*break*/, 5];
                    case 4:
                        res.status(500).json({ msg: "your product doesnt exist" });
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_6 = _a.sent();
                        res.status(500).json({ msg: error_6 });
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return productsController;
}());
exports.default = productsController;
