"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var Users_1 = require("../models/Users");
var userController = /** @class */ (function () {
    function userController() {
    }
    userController.getUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var findUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Users_1.User.find({})];
                    case 1:
                        findUser = _a.sent();
                        res.status(200).json({ data: findUser });
                        return [2 /*return*/];
                }
            });
        });
    };
    userController.getUserID = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, findUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, Users_1.User.findById(id)];
                    case 1:
                        findUser = _a.sent();
                        res.status(200).json({ data: findUser });
                        return [2 /*return*/];
                }
            });
        });
    };
    userController.createUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var salt, newUser, verifUser, findUser, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        salt = bcryptjs_1.default.genSaltSync(10);
                        newUser = {
                            role: req.body.role,
                            email: req.body.email,
                            password: bcryptjs_1.default.hashSync(req.body.password, salt),
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            phoneNumber: req.body.phoneNumber
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, Users_1.User.findOne({ email: req.body.email })];
                    case 2:
                        verifUser = _a.sent();
                        if (!verifUser) return [3 /*break*/, 3];
                        res.status(500).json({ msg: "Email already exist" });
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, Users_1.User.create(newUser)];
                    case 4:
                        findUser = _a.sent();
                        res.status(201).json({ msg: "new user created", data: findUser });
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_1 = _a.sent();
                        res.status(500).json({ msg: "error" });
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    userController.loginUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var findEmail, passwordIsValid, secretKey, token, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Users_1.User.findOne({ email: req.body.email })];
                    case 1:
                        findEmail = _a.sent();
                        if (!findEmail) {
                            return [2 /*return*/, res.status(500).json({ msg: "user and password doesn't match" })];
                        }
                        passwordIsValid = bcryptjs_1.default.compareSync(req.body.password, findEmail.password);
                        if (!passwordIsValid) {
                            return [2 /*return*/, res.status(500).json({ message: "user and password doesnt match" })];
                        }
                        secretKey = process.env.SECRET_KEY;
                        token = jsonwebtoken_1.default.sign({ id: findEmail.id }, secretKey);
                        res.status(200).json({ msg: "login succes", data: findEmail, accessToken: token });
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        res.status(500).json({ msg: "error cuk" });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    userController.forgetPasswordRequest = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    userController.forgetPassword = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, password, email, user, salt, newData, updateUserPass;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, password = _a.password, email = _a.email;
                        return [4 /*yield*/, Users_1.User.findOne({ email: email })];
                    case 1:
                        user = _b.sent();
                        if (!user) return [3 /*break*/, 3];
                        salt = bcryptjs_1.default.genSaltSync(10);
                        newData = { password: password };
                        newData.password = bcryptjs_1.default.hashSync(newData.password, salt);
                        return [4 /*yield*/, Users_1.User.findOneAndUpdate({ email: email }, newData, { new: true })];
                    case 2:
                        updateUserPass = _b.sent();
                        res.status(200).json({ success: true, data: updateUserPass });
                        return [3 /*break*/, 4];
                    case 3:
                        next({ name: 'Forget Password Error' });
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return userController;
}());
exports.default = userController;