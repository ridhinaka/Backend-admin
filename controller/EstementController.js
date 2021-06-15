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
var Payable_1 = require("../models/Payable");
var Receivable_1 = require("../models/Receivable");
var E_Statement_1 = require("../models/E-Statement");
var EStatementController = /** @class */ (function () {
    function EStatementController() {
    }
    EStatementController.createEStatement = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var inputDateFrom, inputDateUntill, date_from, date_to, rangeDate, getAllPayable, getAllReceivable, findUser, createEstatement, create_estatement, totalPayable, i, totalReceivable, j, revenue, updateEstatement_3, updateEstatement_1, updateEstatement_2, updateEstatement, error_1;
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
                        _a.trys.push([1, 14, , 15]);
                        return [4 /*yield*/, Users_1.User.findById(req.Id)];
                    case 2:
                        findUser = _a.sent();
                        if (!(findUser.role === "owner")) return [3 /*break*/, 13];
                        createEstatement = {
                            codeEstatement: req.body.codeEstatement
                        };
                        return [4 /*yield*/, E_Statement_1.estatement.create(createEstatement)];
                    case 3:
                        create_estatement = _a.sent();
                        totalPayable = 0;
                        return [4 /*yield*/, Payable_1.Payable.find({ date: rangeDate })];
                    case 4:
                        getAllPayable = _a.sent();
                        for (i = 0; i < getAllPayable.length; i++) {
                            totalPayable += getAllPayable[i].amount;
                        }
                        totalReceivable = 0;
                        return [4 /*yield*/, Receivable_1.Receivable.find({ createdAt: rangeDate })];
                    case 5:
                        getAllReceivable = _a.sent();
                        console.log(getAllReceivable);
                        for (j = 0; j < getAllReceivable.length; j++) {
                            totalReceivable += getAllReceivable[j].grandTotal;
                            console.log(totalReceivable);
                        }
                        revenue = totalReceivable - totalPayable;
                        if (!(totalReceivable > totalPayable)) return [3 /*break*/, 7];
                        return [4 /*yield*/, E_Statement_1.estatement.findByIdAndUpdate(create_estatement._id, { $set: { totalPayable: totalPayable, totalReceivable: totalReceivable, revenue: revenue, status: true } }, { new: true })];
                    case 6:
                        updateEstatement_3 = _a.sent();
                        res.status(200).json({ data: updateEstatement_3 });
                        return [3 /*break*/, 11];
                    case 7:
                        if (!(totalReceivable < totalPayable)) return [3 /*break*/, 9];
                        return [4 /*yield*/, E_Statement_1.estatement.findByIdAndUpdate(create_estatement._id, { $set: { totalPayable: totalPayable, totalReceivable: totalReceivable, revenue: revenue, status: false } }, { new: true })];
                    case 8:
                        updateEstatement_1 = _a.sent();
                        res.status(200).json({ data: updateEstatement_1 });
                        return [3 /*break*/, 11];
                    case 9: return [4 /*yield*/, E_Statement_1.estatement.findByIdAndUpdate(create_estatement._id, { $set: { totalPayable: totalPayable, totalReceivable: totalReceivable, revenue: revenue } }, { new: true })];
                    case 10:
                        updateEstatement_2 = _a.sent();
                        res.status(200).json({ data: updateEstatement_2 });
                        _a.label = 11;
                    case 11: return [4 /*yield*/, E_Statement_1.estatement.findByIdAndUpdate(create_estatement._id, { $set: { totalPayable: totalPayable, status: true } }, { new: true })];
                    case 12:
                        updateEstatement = _a.sent();
                        _a.label = 13;
                    case 13: return [3 /*break*/, 15];
                    case 14:
                        error_1 = _a.sent();
                        res.status(500).json({ msg: error_1 });
                        return [3 /*break*/, 15];
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    EStatementController.getSpecificEstatement = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, findEstatement, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, E_Statement_1.estatement.findById(id)];
                    case 2:
                        findEstatement = _a.sent();
                        res.status(200).json({ data: findEstatement });
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
    return EStatementController;
}());
exports.default = EStatementController;
