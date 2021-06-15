"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.estatement = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var estatementSchema = new mongoose_1.default.Schema({
    codeEstatement: { type: String, required: true, unique: true },
    totalPayable: { type: Number },
    totalReceivable: { type: Number },
    revenue: { type: Number },
    status: { type: Boolean, default: null },
    dateFrom: { type: String },
    dateTo: { type: String }
}, {
    timestamps: true,
    versionKey: false
});
var estatement = mongoose_1.default.model('estatementSchema', estatementSchema);
exports.estatement = estatement;
