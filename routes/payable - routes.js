"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var payable_controller_1 = __importDefault(require("../controller/payable-controller"));
var payableRoutes = /** @class */ (function () {
    function payableRoutes() {
        this.router = express_1.Router();
        this.route();
    }
    payableRoutes.prototype.route = function () {
        this.router.get('/getPayable', payable_controller_1.default.getPayable);
    };
    return payableRoutes;
}());
exports.default = new payableRoutes().router;
