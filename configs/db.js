"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var mongoDB = /** @class */ (function () {
    function mongoDB() {
    }
    mongoDB.prototype.connectDB = function () {
        var pathURL = 'mongodb://localhost/admin';
        var connectOption = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false };
        mongoose_1.default.connect(pathURL, connectOption, function () {
        });
        var db = mongoose_1.default.connection;
        db.on('error', console.error.bind(console, 'Connection error :'));
        db.once('open', function () {
            console.log("konek bos");
        });
    };
    return mongoDB;
}());
exports.default = new mongoDB().connectDB;
