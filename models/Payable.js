"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payable = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var payableSchema = new mongoose_1.default.Schema({
    supplier_id: { type: mongoose_1.default.Types.ObjectId, ref: 'supplierSchema' },
    id_invoice: { type: mongoose_1.default.Types.ObjectId, ref: 'invoiceSchema' },
    amount: { type: Number },
    remainingCredit: { type: Number },
    date: { type: Date }
}, {
    // timestamps:true,
    versionKey: false
});
var Payable = mongoose_1.default.model('payableSchema', payableSchema);
exports.Payable = Payable;
