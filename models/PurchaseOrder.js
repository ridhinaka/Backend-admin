"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Purchase = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var purchaseSchema = new mongoose_1.default.Schema({
    supplier_id: { type: mongoose_1.default.Types.ObjectId, ref: 'supplierSchema' },
    codeOrder: { type: String, required: true },
    discount: { type: Number, default: 0 },
    products: [{
            product_id: { type: mongoose_1.default.Types.ObjectId, ref: 'productSchema' },
            totalOrder: { type: Number, default: 0 },
            quantity: { type: Number, required: true },
        }],
    productsDeliveryOrder: [{
            product_id: { type: String, ref: 'productSchema' },
            totalOrder: { type: Number },
            quantity: { type: Number }
        }],
    status: { type: Boolean, default: false },
    totalAmount: { type: Number }
}, {
    timestamps: true,
    versionKey: false
});
var Purchase = mongoose_1.default.model('purchaseSchema', purchaseSchema);
exports.Purchase = Purchase;
