"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var brand_controller_1 = __importDefault(require("../controller/brand-controller"));
var express_1 = require("express");
var brandRoutes = /** @class */ (function () {
    function brandRoutes() {
        this.router = express_1.Router();
        this.route();
    }
    brandRoutes.prototype.route = function () {
        this.router.get('/brand/getBrand', brand_controller_1.default.getBrand);
        this.router.post('/brand/createbrand', brand_controller_1.default.createBrand);
    };
    return brandRoutes;
}());
exports.default = new brandRoutes().router;
