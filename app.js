"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var db_1 = __importDefault(require("./configs/db"));
var Index_1 = __importDefault(require("./routes/Index"));
var cors_1 = __importDefault(require("cors"));
var App = /** @class */ (function () {
    function App() {
        this.app = express_1.default();
        this.cors();
        this.plugin();
        this.routes();
    }
    App.prototype.cors = function () {
        this.app.use(cors_1.default());
    };
    App.prototype.routes = function () {
        this.app.use(Index_1.default);
    };
    App.prototype.plugin = function () {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        db_1.default();
    };
    return App;
}());
var app = new App().app;
app.listen(process.env.PORT, function () { return console.log("Server running on port http://localhost:" + process.env.PORT); });
exports.default = new App().app;
