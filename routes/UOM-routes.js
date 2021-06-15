"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UOM_controller_1 = __importDefault(require("../controller/UOM-controller"));
var UOMRoutes = /** @class */ (function () {
    function UOMRoutes() {
        this.router = express_1.Router();
        this.route();
    }
    UOMRoutes.prototype.route = function () {
        this.router.get('/getUOM', UOM_controller_1.default.getUOM);
        this.router.post('/UOM/create', UOM_controller_1.default.createUOM);
    };
    return UOMRoutes;
}());
exports.default = new UOMRoutes().router;
