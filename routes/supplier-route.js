"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var supplier_controller_1 = __importDefault(require("../controller/supplier-controller"));
var supplierRoute = /** @class */ (function () {
    function supplierRoute() {
        this.router = express_1.Router();
        this.route();
    }
    supplierRoute.prototype.route = function () {
        this.router.get('/supplier/getsupplier', supplier_controller_1.default.getSupplier);
        this.router.post('/supplier/create', supplier_controller_1.default.createSupplier);
    };
    return supplierRoute;
}());
exports.default = new supplierRoute().router;
