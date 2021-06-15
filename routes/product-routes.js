"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var product_controller_1 = __importDefault(require("../controller/product-controller"));
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploadsProduct/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});
var fileFilter = function (req, file, cb) {
    if (file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpeg') {
        cb(null, true);
    }
    else {
        cb(null, false);
        console.log('format must jpg,jpeg,png');
    }
};
var uploads = multer_1.default({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});
var productRoutes = /** @class */ (function () {
    function productRoutes() {
        this.router = express_1.Router();
        this.route();
    }
    productRoutes.prototype.route = function () {
        this.router.post('/product/createproduct', product_controller_1.default.createProduct);
        this.router.post('/product/createproduct', uploads.single('productImage'), product_controller_1.default.uploadProduct);
        this.router.get('/product/getProduct', product_controller_1.default.getProduct);
        this.router.get('/product/:id', product_controller_1.default.getSpecificProduct);
        this.router.put('/updateStatusProduct/:id', product_controller_1.default.changeStatusProductActive);
    };
    return productRoutes;
}());
exports.default = new productRoutes().router;
