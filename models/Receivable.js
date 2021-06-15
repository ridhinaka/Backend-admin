"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Receivable = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var receivableSchema = new mongoose_1.default.Schema({
    orderCashier_id: { type: mongoose_1.default.Types.ObjectId, ref: 'createOrderCashierSchema' },
    grandTotal: { type: Number }
}, {
    timestamps: true,
    versionKey: false
});
var Receivable = mongoose_1.default.model('receivableSchema', receivableSchema);
exports.Receivable = Receivable;
