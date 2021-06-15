"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var createOrderCashier___controller_1 = __importDefault(require("../controller/createOrderCashier - controller"));
var createOrderCashierRoutes = /** @class */ (function () {
    function createOrderCashierRoutes() {
        this.router = express_1.Router();
        this.route();
    }
    createOrderCashierRoutes.prototype.route = function () {
        this.router.get('/getOrderCashier', createOrderCashier___controller_1.default.getAllOrder);
        this.router.get('/getOrderTotalCashier', createOrderCashier___controller_1.default.getAllOrderCashier);
        this.router.get('/getSpecifiCashierOrder/:id', createOrderCashier___controller_1.default.getSpecifiCashierOrder);
        this.router.get('/getSubTotal/:id', createOrderCashier___controller_1.default.getTotalOrderCashier);
        this.router.get('/isTax/:id', createOrderCashier___controller_1.default.taxOrder);
        this.router.get('/noTaxOrder/:id', createOrderCashier___controller_1.default.noTaxOrder);
        this.router.post('/createOrderCashier', createOrderCashier___controller_1.default.createOrder);
        this.router.post('/addProduct/:id', createOrderCashier___controller_1.default.addProductCashier);
        this.router.post('/cancelOrder/:id', createOrderCashier___controller_1.default.cancelOrder);
        this.router.put('/toplistProduct', createOrderCashier___controller_1.default.getTopListProduct);
    };
    return createOrderCashierRoutes;
}());
exports.default = new createOrderCashierRoutes().router;
