"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var EstementController_1 = __importDefault(require("../controller/EstementController"));
var estatementRoutes = /** @class */ (function () {
    function estatementRoutes() {
        this.router = express_1.Router();
        this.route();
    }
    estatementRoutes.prototype.route = function () {
        this.router.get('/getEs/:id', EstementController_1.default.getSpecificEstatement);
        this.router.post('/estatementCreate', EstementController_1.default.createEStatement);
    };
    return estatementRoutes;
}());
exports.default = new estatementRoutes().router;
