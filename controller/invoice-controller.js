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
var Invoice_1 = require("../models/Invoice");
var Users_1 = require("../models/Users");
var PurchaseOrder_1 = require("../models/PurchaseOrder");
var ChangeStatus_1 = require("../models/ChangeStatus");
var Payable_1 = require("../models/Payable");
var invoiceController = /** @class */ (function () {
    function invoiceController() {
    }
    invoiceController.getInvoice = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var findInvoice;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Invoice_1.Invoice.find({})];
                    case 1:
                        findInvoice = _a.sent();
                        res.status(200).json({ msg: findInvoice });
                        return [2 /*return*/];
                }
            });
        });
    };
    invoiceController.getSpecificInvoice = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, specificInvoice, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Invoice_1.Invoice.findById(id).populate('purchaseCode')];
                    case 2:
                        specificInvoice = _a.sent();
                        res.status(200).json({ msg: specificInvoice });
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
    invoiceController.createInvoice = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, purchaseCode, findUser, findPurchaseOrder, findInvoice, newInvoice, create_newInvoice, updatePurchase, updateInvoice, newPayable, create_payable, updatePayable, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        purchaseCode = req.body.purchaseCode;
                        return [4 /*yield*/, Users_1.User.findById(req.Id)];
                    case 1:
                        findUser = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 15, , 16]);
                        if (!(findUser.role === "finance")) return [3 /*break*/, 13];
                        return [4 /*yield*/, PurchaseOrder_1.Purchase.findById(purchaseCode)];
                    case 3:
                        findPurchaseOrder = _a.sent();
                        console.log(purchaseCode);
                        return [4 /*yield*/, Invoice_1.Invoice.findOne({ purchaseCode: purchaseCode })];
                    case 4:
                        findInvoice = _a.sent();
                        newInvoice = {
                            purchaseCode: purchaseCode,
                            invoiceCode: req.body.invoiceCode
                        };
                        if (!(findPurchaseOrder === null || findInvoice !== null)) return [3 /*break*/, 5];
                        res.status(500).json({ msg: "cannot create invoice" });
                        return [3 /*break*/, 12];
                    case 5: return [4 /*yield*/, Invoice_1.Invoice.create(newInvoice)];
                    case 6:
                        create_newInvoice = _a.sent();
                        return [4 /*yield*/, PurchaseOrder_1.Purchase.findByIdAndUpdate(purchaseCode, { $set: { status: true } }, { new: true })];
                    case 7:
                        updatePurchase = _a.sent();
                        return [4 /*yield*/, Invoice_1.Invoice.findByIdAndUpdate(create_newInvoice._id, { $set: { purchaseCode: purchaseCode, supplier_id: findPurchaseOrder.supplier_id, grandTotal: findPurchaseOrder.totalAmount, remaining_credit: findPurchaseOrder.totalAmount } }, { new: true }).populate('purchaseCode')];
                    case 8:
                        updateInvoice = _a.sent();
                        if (!updateInvoice) return [3 /*break*/, 11];
                        newPayable = {
                            supplier_id: findPurchaseOrder.supplier_id,
                            id_invoice: updateInvoice._id,
                            amount: updateInvoice.grandTotal,
                            remainingCredit: updateInvoice.remaining_credit
                        };
                        return [4 /*yield*/, Payable_1.Payable.create(newPayable)];
                    case 9:
                        create_payable = _a.sent();
                        return [4 /*yield*/, Payable_1.Payable.findByIdAndUpdate(create_payable, { $set: { date: new Date() } }, { new: true })];
                    case 10:
                        updatePayable = _a.sent();
                        console.log(typeof updatePayable.date);
                        _a.label = 11;
                    case 11:
                        res.status(201).json({ msg: "your invoice have been created", data: updateInvoice });
                        _a.label = 12;
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        res.status(500).json({ msg: "you are not allowed to create invoice" });
                        _a.label = 14;
                    case 14: return [3 /*break*/, 16];
                    case 15:
                        error_2 = _a.sent();
                        res.status(500).json({ msg: "cannot create Invoice", data: error_2 });
                        return [3 /*break*/, 16];
                    case 16: return [2 /*return*/];
                }
            });
        });
    };
    invoiceController.changeStatus = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, purchase_id, findInvoice, findUser, newChange, findPurchaseAmount, checkDocument, change_status, updateChange, newTotal, invoiceUpdate, updateCredit, updateInvoiceStatus, updateChange, updateChangeStatus, UpdateTotalCreditInvoice, updateInvoiceStatus, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        purchase_id = req.body.purchase_id;
                        return [4 /*yield*/, Invoice_1.Invoice.findById(id)];
                    case 1:
                        findInvoice = _a.sent();
                        return [4 /*yield*/, Users_1.User.findById(req.Id)];
                    case 2:
                        findUser = _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 23, , 24]);
                        if (!(findUser.role === "finance")) return [3 /*break*/, 22];
                        newChange = {
                            invoice_id: id,
                            purchase_id: purchase_id,
                            amount: req.body.amount
                        };
                        return [4 /*yield*/, PurchaseOrder_1.Purchase.findById(purchase_id)];
                    case 4:
                        findPurchaseAmount = _a.sent();
                        return [4 /*yield*/, ChangeStatus_1.ChangeStatus.countDocuments({ invoice_id: findInvoice._id })];
                    case 5:
                        checkDocument = _a.sent();
                        if (!(checkDocument === 0)) return [3 /*break*/, 15];
                        return [4 /*yield*/, ChangeStatus_1.ChangeStatus.create(newChange)];
                    case 6:
                        change_status = _a.sent();
                        return [4 /*yield*/, Invoice_1.Invoice.findByIdAndUpdate(id, { $set: { remaining_credit: findPurchaseAmount.totalAmount } }, { new: true })];
                    case 7:
                        updateChange = _a.sent();
                        newTotal = updateChange.remaining_credit - change_status.amount;
                        return [4 /*yield*/, Invoice_1.Invoice.findByIdAndUpdate(id, { $set: { remaining_credit: newTotal } }, { new: true })];
                    case 8:
                        invoiceUpdate = _a.sent();
                        if (!(newTotal !== 0)) return [3 /*break*/, 11];
                        return [4 /*yield*/, Invoice_1.Invoice.findByIdAndUpdate(id, { $set: { remaining_credit: invoiceUpdate.remaining_credit } }, { new: true })];
                    case 9:
                        updateCredit = _a.sent();
                        return [4 /*yield*/, Payable_1.Payable.findOneAndUpdate({ id_invoice: updateCredit._id }, { $set: { remainingCredit: updateCredit.remaining_credit } }, { new: true })];
                    case 10:
                        _a.sent();
                        res.status(200).json({ msg: "your remaining credit are", data: updateCredit });
                        return [3 /*break*/, 14];
                    case 11: return [4 /*yield*/, Invoice_1.Invoice.findByIdAndUpdate(id, { $set: { status: "paid" } }, { new: true })];
                    case 12:
                        updateInvoiceStatus = _a.sent();
                        return [4 /*yield*/, Payable_1.Payable.findOneAndUpdate({ id_invoice: updateInvoiceStatus._id }, { $set: { remainingCredit: 0 } }, { new: true })];
                    case 13:
                        _a.sent();
                        res.status(200).json({ msg: "paid", data: updateInvoiceStatus });
                        _a.label = 14;
                    case 14: return [3 /*break*/, 22];
                    case 15:
                        updateChange = {
                            amount: req.body.amount
                        };
                        return [4 /*yield*/, ChangeStatus_1.ChangeStatus.findOneAndUpdate({ invoice_id: findInvoice._id }, { $set: { amount: req.body.amount } }, { new: true })];
                    case 16:
                        updateChangeStatus = _a.sent();
                        if (!updateChange) return [3 /*break*/, 22];
                        return [4 /*yield*/, Invoice_1.Invoice.findByIdAndUpdate(id, { $inc: { remaining_credit: -updateChangeStatus.amount } }, { new: true })];
                    case 17:
                        UpdateTotalCreditInvoice = _a.sent();
                        return [4 /*yield*/, Payable_1.Payable.findOneAndUpdate({ id_invoice: UpdateTotalCreditInvoice._id }, { $set: { remainingCredit: UpdateTotalCreditInvoice.remaining_credit } }, { new: true })];
                    case 18:
                        _a.sent();
                        if (!(UpdateTotalCreditInvoice.remaining_credit === 0)) return [3 /*break*/, 21];
                        return [4 /*yield*/, Invoice_1.Invoice.findByIdAndUpdate(id, { $set: { status: "paid" } }, { new: true })];
                    case 19:
                        updateInvoiceStatus = _a.sent();
                        return [4 /*yield*/, Payable_1.Payable.findOneAndUpdate({ id_invoice: updateInvoiceStatus._id }, { $set: { remainingCredit: 0 } }, { new: true })];
                    case 20:
                        _a.sent();
                        res.status(200).json({ data: updateInvoiceStatus });
                        return [3 /*break*/, 22];
                    case 21:
                        res.status(200).json({ msg: UpdateTotalCreditInvoice });
                        _a.label = 22;
                    case 22: return [3 /*break*/, 24];
                    case 23:
                        error_3 = _a.sent();
                        res.status(500).json({ msg: error_3 });
                        return [3 /*break*/, 24];
                    case 24: return [2 /*return*/];
                }
            });
        });
    };
    invoiceController.changeStatusTest = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, purchase_id, invoice_id, findInvoice, findUser, newChange, findPurchaseAmount, checkDocument, change_status, updateChange, newTotal, invoiceUpdate, updateCredit, updateInvoiceStatus, updateChange, updateChangeStatus, UpdateTotalCreditInvoice, updateInvoiceStatus, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.params.id;
                        _a = req.body, purchase_id = _a.purchase_id, invoice_id = _a.invoice_id;
                        return [4 /*yield*/, Invoice_1.Invoice.findById(invoice_id)];
                    case 1:
                        findInvoice = _b.sent();
                        return [4 /*yield*/, Users_1.User.findById(req.Id)];
                    case 2:
                        findUser = _b.sent();
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 23, , 24]);
                        if (!(findUser.role === "finance")) return [3 /*break*/, 22];
                        newChange = {
                            invoice_id: invoice_id,
                            purchase_id: purchase_id,
                            amount: req.body.amount
                        };
                        return [4 /*yield*/, PurchaseOrder_1.Purchase.findById(purchase_id)];
                    case 4:
                        findPurchaseAmount = _b.sent();
                        return [4 /*yield*/, ChangeStatus_1.ChangeStatus.countDocuments({ invoice_id: findInvoice._id })];
                    case 5:
                        checkDocument = _b.sent();
                        if (!(checkDocument === 0)) return [3 /*break*/, 15];
                        return [4 /*yield*/, ChangeStatus_1.ChangeStatus.create(newChange)];
                    case 6:
                        change_status = _b.sent();
                        return [4 /*yield*/, Invoice_1.Invoice.findByIdAndUpdate(invoice_id, { $set: { remaining_credit: findPurchaseAmount.totalAmount } }, { new: true })];
                    case 7:
                        updateChange = _b.sent();
                        newTotal = updateChange.remaining_credit - change_status.amount;
                        return [4 /*yield*/, Invoice_1.Invoice.findByIdAndUpdate(invoice_id, { $set: { remaining_credit: newTotal } }, { new: true })];
                    case 8:
                        invoiceUpdate = _b.sent();
                        if (!(newTotal !== 0)) return [3 /*break*/, 11];
                        return [4 /*yield*/, Invoice_1.Invoice.findByIdAndUpdate(invoice_id, { $set: { remaining_credit: invoiceUpdate.remaining_credit } }, { new: true })];
                    case 9:
                        updateCredit = _b.sent();
                        return [4 /*yield*/, Payable_1.Payable.findOneAndUpdate({ id_invoice: updateCredit._id }, { $set: { remainingCredit: updateCredit.remaining_credit } }, { new: true })];
                    case 10:
                        _b.sent();
                        res.status(200).json({ msg: "your remaining credit are", data: updateCredit });
                        return [3 /*break*/, 14];
                    case 11: return [4 /*yield*/, Invoice_1.Invoice.findByIdAndUpdate(invoice_id, { $set: { status: "paid" } }, { new: true })];
                    case 12:
                        updateInvoiceStatus = _b.sent();
                        return [4 /*yield*/, Payable_1.Payable.findOneAndUpdate({ id_invoice: updateInvoiceStatus._id }, { $set: { remainingCredit: 0 } }, { new: true })];
                    case 13:
                        _b.sent();
                        res.status(200).json({ msg: "paid", data: updateInvoiceStatus });
                        _b.label = 14;
                    case 14: return [3 /*break*/, 22];
                    case 15:
                        updateChange = {
                            invoice_id: invoice_id,
                            purchase_id: purchase_id,
                            amount: req.body.amount
                        };
                        return [4 /*yield*/, ChangeStatus_1.ChangeStatus.findOneAndUpdate({ invoice_id: findInvoice._id }, { $set: { amount: req.body.amount } }, { new: true })];
                    case 16:
                        updateChangeStatus = _b.sent();
                        if (!updateChange) return [3 /*break*/, 22];
                        return [4 /*yield*/, Invoice_1.Invoice.findByIdAndUpdate(invoice_id, { $inc: { remaining_credit: -updateChangeStatus.amount } }, { new: true })];
                    case 17:
                        UpdateTotalCreditInvoice = _b.sent();
                        return [4 /*yield*/, Payable_1.Payable.findOneAndUpdate({ id_invoice: UpdateTotalCreditInvoice._id }, { $inc: { remainingCredit: -UpdateTotalCreditInvoice.remaining_credit } }, { new: true })];
                    case 18:
                        _b.sent();
                        if (!(UpdateTotalCreditInvoice.remaining_credit === 0)) return [3 /*break*/, 21];
                        return [4 /*yield*/, Invoice_1.Invoice.findByIdAndUpdate(invoice_id, { $set: { status: "paid" } }, { new: true })];
                    case 19:
                        updateInvoiceStatus = _b.sent();
                        return [4 /*yield*/, Payable_1.Payable.findOneAndUpdate({ id_invoice: updateInvoiceStatus._id }, { $set: { remainingCredit: 0 } }, { new: true })];
                    case 20:
                        _b.sent();
                        res.status(200).json({ data: updateInvoiceStatus });
                        return [3 /*break*/, 22];
                    case 21:
                        res.status(200).json({ msg: UpdateTotalCreditInvoice });
                        _b.label = 22;
                    case 22: return [3 /*break*/, 24];
                    case 23:
                        error_4 = _b.sent();
                        res.status(500).json({ msg: error_4 });
                        return [3 /*break*/, 24];
                    case 24: return [2 /*return*/];
                }
            });
        });
    };
    return invoiceController;
}());
exports.default = invoiceController;
