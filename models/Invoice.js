"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Invoice = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var invoiceSchema = new mongoose_1.default.Schema({
    purchaseCode: { type: mongoose_1.default.Types.ObjectId, ref: 'purchaseSchema' },
    invoiceCode: { type: String, required: true, unique: true },
    status: { type: String, default: "pending" },
    grandTotal: { type: Number, default: 0 },
    remaining_credit: { type: Number, default: 0 },
}, {
    timestamps: true,
    versionKey: false
});
var Invoice = mongoose_1.default.model('invoiceSchema', invoiceSchema);
exports.Invoice = Invoice;
