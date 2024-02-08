"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const auth_service_1 = require("./auth.service");
class AuthController {
    constructor() {
        this.signup = (0, express_async_handler_1.default)(async (req, res, next) => {
            const signupData = {
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
                avatar: req.file?.path,
            };
            const result = await this.authService.signup(signupData);
            res.status(201).json({
                status: "success",
                data: result.user,
                access_token: result.accessToken,
            });
        });
        this.login = (0, express_async_handler_1.default)(async (req, res, next) => {
            const loginData = {
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
            };
            const result = await this.authService.login(loginData);
            res.status(200).json({
                status: "success",
                data: result.user,
                access_token: result.accessToken,
            });
        });
        this.authService = new auth_service_1.AuthService();
    }
}
const authController = new AuthController();
exports.default = authController;
//# sourceMappingURL=auth.controller.js.map