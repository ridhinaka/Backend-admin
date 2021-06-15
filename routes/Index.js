"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_routes_1 = __importDefault(require("../routes/user-routes"));
var product_routes_1 = __importDefault(require("../routes/product-routes"));
var brand_routes_1 = __importDefault(require("../routes/brand-routes"));
var UOM_routes_1 = __importDefault(require("../routes/UOM-routes"));
var supplier_route_1 = __importDefault(require("../routes/supplier-route"));
var purchase_route_1 = __importDefault(require("../routes/purchase-route"));
var invoice_routes_1 = __importDefault(require("../routes/invoice-routes"));
var delivery_routes_1 = __importDefault(require("../routes/delivery-routes"));
var createOrderCashier___routes_1 = __importDefault(require("../routes/createOrderCashier - routes"));
var receivable___routes_1 = __importDefault(require("../routes/receivable - routes"));
var payable___routes_1 = __importDefault(require("../routes/payable - routes"));
var eStatement_routes_1 = __importDefault(require("../routes/eStatement-routes"));
// import authJwt from '../middlewares/auth'
var Routes = /** @class */ (function () {
    function Routes() {
        this.router = express_1.Router();
        this.routes();
        this.user();
        // this.auth()
        this.brand();
        this.product();
        this.uom();
        this.supplier();
        this.purchase();
        this.delivery();
        this.invoice();
        this.createOrderCashier();
        this.receivable();
        this.payable();
        this.estatement();
    }
    Routes.prototype.routes = function () {
        this.router.get("/", function (req, res) {
            res.status(200).json({ msg: "welcome to mobile legend" });
        });
    };
    Routes.prototype.user = function () {
        this.router.use(user_routes_1.default);
    };
    // public auth() :void{
    //   this.router.use(authJwt.authentication)
    // }
    Routes.prototype.brand = function () {
        this.router.use(brand_routes_1.default);
    };
    Routes.prototype.product = function () {
        this.router.use(product_routes_1.default);
    };
    Routes.prototype.uom = function () {
        this.router.use(UOM_routes_1.default);
    };
    Routes.prototype.supplier = function () {
        this.router.use(supplier_route_1.default);
    };
    Routes.prototype.purchase = function () {
        this.router.use(purchase_route_1.default);
    };
    Routes.prototype.delivery = function () {
        this.router.use(delivery_routes_1.default);
    };
    Routes.prototype.invoice = function () {
        this.router.use(invoice_routes_1.default);
    };
    Routes.prototype.createOrderCashier = function () {
        this.router.use(createOrderCashier___routes_1.default);
    };
    Routes.prototype.receivable = function () {
        this.router.use(receivable___routes_1.default);
    };
    Routes.prototype.payable = function () {
        this.router.use(payable___routes_1.default);
    };
    Routes.prototype.estatement = function () {
        this.router.use(eStatement_routes_1.default);
    };
    return Routes;
}());
exports.default = new Routes().router;
