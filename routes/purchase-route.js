"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var purchaseOrder_controller_1 = __importDefault(require("../controller/purchaseOrder-controller"));
var purchaseRoutes = /** @class */ (function () {
    function purchaseRoutes() {
        this.router = express_1.Router();
        this.route();
    }
    purchaseRoutes.prototype.route = function () {
        this.router.get('/purchaseOrder', purchaseOrder_controller_1.default.getPurchase);
        this.router.post('/create/purchaseOrder', purchaseOrder_controller_1.default.createPurchaseOrder);
        this.router.post('/updatePurchase/:id', purchaseOrder_controller_1.default.updatePurchase);
        this.router.get('/getTotalOrder/:id', purchaseOrder_controller_1.default.totalOrder);
        this.router.get('/getSpesificPurchase/:id', purchaseOrder_controller_1.default.getSpesificPurchase);
    };
    return purchaseRoutes;
}());
exports.default = new purchaseRoutes().router;
