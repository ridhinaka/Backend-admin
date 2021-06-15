"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = __importStar(require("jsonwebtoken"));
var authJwt = /** @class */ (function () {
    function authJwt() {
    }
    authJwt.authentication = function (req, res, next) {
        var accessToken = req.headers.accesstoken;
        if (!accessToken) {
            console.log("missing acces token");
            return res.status(401).json({ msg: 'Missing access token', success: false });
        }
        var secretKey = process.env.SECRET_KEY;
        jwt.verify(accessToken, secretKey, function (err, decoded) {
            if (err) {
                res.status(401).json({ msg: 'Invalid token', success: false });
            }
            req.Id = decoded.id;
            next();
        });
    };
    return authJwt;
}());
exports.default = authJwt;
