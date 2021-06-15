"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var invoice_controller_1 = __importDefault(require("../controller/invoice-controller"));
var invoiceRoutes = /** @class */ (function () {
    function invoiceRoutes() {
        this.router = express_1.Router();
        this.route();
    }
    invoiceRoutes.prototype.route = function () {
        this.router.get('/invoice', invoice_controller_1.default.getInvoice);
        this.router.get('/invoice/:id', invoice_controller_1.default.getSpecificInvoice);
        this.router.post('/invoice/create', invoice_controller_1.default.createInvoice);
        this.router.post('/invoice/changeStatus/:id', invoice_controller_1.default.changeStatus);
    };
    return invoiceRoutes;
}());
exports.default = new invoiceRoutes().router;
