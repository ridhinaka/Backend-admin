"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cancel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var cancelSchema = new mongoose_1.default.Schema({
    orderCashier_id: { type: mongoose_1.default.Types.ObjectId, ref: 'createOrderCashierSchema' },
    reason: { type: String, required: true },
    codeOrder: { type: String, unique: true }
}, {
    timestamps: true,
    versionKey: false
});
var Cancel = mongoose_1.default.model('cancelSchema', cancelSchema);
exports.Cancel = Cancel;
