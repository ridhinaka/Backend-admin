"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var receivable___controller_1 = __importDefault(require("../controller/receivable - controller"));
var receivableRoutes = /** @class */ (function () {
    function receivableRoutes() {
        this.router = express_1.Router();
        this.route();
    }
    receivableRoutes.prototype.route = function () {
        this.router.get('/getReceivable', receivable___controller_1.default.getAllReceivable);
    };
    return receivableRoutes;
}());
exports.default = new receivableRoutes().router;
