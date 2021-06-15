"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UOM = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var UOMschema = new mongoose_1.default.Schema({
    UOM_name: { type: String, required: true, unique: true }
}, {
    timestamps: true,
    versionKey: false
});
var UOM = mongoose_1.default.model('UOM', UOMschema);
exports.UOM = UOM;
