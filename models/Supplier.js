"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Supplier = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var supplierSchema = new mongoose_1.default.Schema({
    inventory_id: { type: mongoose_1.default.Types.ObjectId, ref: 'userSchema' },
    supplierName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        postalCode: { type: Number, required: true },
    }
}, {
    timestamps: true,
    versionKey: false
});
var Supplier = mongoose_1.default.model('supplierSchema', supplierSchema);
exports.Supplier = Supplier;
