"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthorized = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../../modules/users/user.model");
const api_error_1 = __importDefault(require("../../shared/utils/api-error"));
const isAuthorized = () => {
    return (0, express_async_handler_1.default)(async (req, res, next) => {
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            const token = req.headers.authorization.split(" ")[1];
            if (!token) {
                return next(new api_error_1.default("Your not logged in, please log in to continue!", 403));
            }
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            if (!decoded) {
                return next(new api_error_1.default("Unauthorized!", 401));
            }
            const user = (await user_model_1.UserModel.findOne({ _id: decoded.userId }));
            if (!user) {
                return next(new api_error_1.default("Unauthorized!", 401));
            }
            req.user = user;
            next();
        }
        else {
            return next(new api_error_1.default("You are not authorized to perform this action!", 401));
        }
    });
};
exports.isAuthorized = isAuthorized;
//# sourceMappingURL=authorization.js.map