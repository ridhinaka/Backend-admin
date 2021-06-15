"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderCashier = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var createOrderCashierSchema = new mongoose_1.default.Schema({
    code_order_cashier: { type: String, required: true, unique: true },
    productsCashier: [{
            cashierProduct_id: { type: mongoose_1.default.Types.ObjectId, ref: 'productSchema' },
            quantity_product: { type: Number, required: true },
            subTotal: { type: Number, default: 0 },
        }],
    subTotalCashier: { type: Number },
    subTotalTax: { type: Number },
    subTotalNoTax: { type: Number },
    grandTotal: { type: Number },
    status: { type: String, default: "succeed" }
}, {
    timestamps: true,
    versionKey: false
});
var CreateOrderCashier = mongoose_1.default.model('createOrderCashierSchema', createOrderCashierSchema);
exports.CreateOrderCashier = CreateOrderCashier;
