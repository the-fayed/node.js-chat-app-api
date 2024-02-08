"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const api_error_1 = __importDefault(require("../../shared/utils/api-error"));
const user_service_1 = require("./user.service");
class UserController {
    constructor() {
        this.getAllUsers = (0, express_async_handler_1.default)(async (req, res, next) => {
            const result = await this.userService.getAllUsers(req.query);
            if (!result.documents.length) {
                throw new api_error_1.default("", 204);
            }
            res.status(200).json({
                status: "success",
                paginationResult: result.paginationResults,
                data: result.documents,
            });
        });
        this.getUserById = (0, express_async_handler_1.default)(async (req, res, next) => {
            const result = await this.userService.getUserById(req.params.id);
            res.status(200).json({ status: "success", data: result });
        });
        this.getLoggedUser = (0, express_async_handler_1.default)(async (req, res, next) => {
            const result = await this.userService.getUserById(req.user.id);
            res.status(200).json({ status: 'success', data: result });
        });
        this.updateUserData = (0, express_async_handler_1.default)(async (req, res, next) => {
            const data = {
                id: req.user.id,
                username: req.body.username,
                email: req.body.email,
                avatar: req.file?.path,
            };
            const result = await this.userService.updateUserData(data);
            res.status(200).json({
                status: "success",
                message: "Data updated successfully!",
                data: result,
            });
        });
        this.updateUserPassword = (0, express_async_handler_1.default)(async (req, res, next) => {
            const data = {
                id: req.user.id,
                password: req.body.password,
            };
            const result = await this.userService.updateUserPassword(data);
            res.status(200).json({
                status: "success",
                message: "Password updated successfully!",
                data: result,
            });
        });
        this.deleteUser = (0, express_async_handler_1.default)(async (req, res, next) => {
            const result = await this.userService.deleteUser(req.user.id);
            res.status(200).json({ status: "success", message: "Account deleted successfully!" });
        });
        this.userService = new user_service_1.UserService();
    }
}
const userController = new UserController();
exports.default = userController;
//# sourceMappingURL=user.controller.js.map