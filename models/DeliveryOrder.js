"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delivery = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var deliveryschema = new mongoose_1.default.Schema({
    id_product: { type: mongoose_1.default.Types.ObjectId, ref: 'productSchema' },
    deliveryCode: { type: String, required: true },
    purchase_id: { type: mongoose_1.default.Types.ObjectId, ref: 'purchaseSchema' },
    date: { type: Date, required: true }
}, {
    timestamps: true,
    versionKey: false
});
var Delivery = mongoose_1.default.model('deliverySchema', deliveryschema);
exports.Delivery = Delivery;
