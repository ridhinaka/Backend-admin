"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var productSchema = new mongoose_1.default.Schema({
    brand_id: { type: mongoose_1.default.Types.ObjectId, ref: 'brandSchema' },
    UOM_id: { type: mongoose_1.default.Types.ObjectId, ref: 'UOM' },
    productName: { type: String, required: true },
    productImage: { type: String, required: true },
    sellingPrice: { type: Number, required: true },
    purchasePrice: { type: Number, required: true },
    productStatus: { type: String, required: true, default: "deactive" },
    code_product: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    status: { type: Boolean, default: false },
}, {
    timestamps: true,
    versionKey: false
});
var Product = mongoose_1.default.model('productSchema', productSchema);
exports.Product = Product;
