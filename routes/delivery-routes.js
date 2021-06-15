"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var delivery_order_controller_1 = __importDefault(require("../controller/delivery-order-controller"));
var deliveryRoutes = /** @class */ (function () {
    function deliveryRoutes() {
        this.router = express_1.Router();
        this.route();
    }
    deliveryRoutes.prototype.route = function () {
        this.router.get('/delivery', delivery_order_controller_1.default.getDeliveryOrder);
        this.router.post('/create/delivery', delivery_order_controller_1.default.createDeliveryOrder);
    };
    return deliveryRoutes;
}());
exports.default = new deliveryRoutes().router;
