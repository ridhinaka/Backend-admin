"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeStatus = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var changeStatusSchema = new mongoose_1.default.Schema({
    invoice_id: { type: mongoose_1.default.Types.ObjectId, ref: 'invoiceSchema' },
    purchase_id: { type: mongoose_1.default.Types.ObjectId, ref: 'purchaseSchema' },
    amount: { type: Number, required: true }
}, {
    timestamps: true,
    versionKey: false
});
var ChangeStatus = mongoose_1.default.model('changeStatusSchema', changeStatusSchema);
exports.ChangeStatus = ChangeStatus;
