"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_error_1 = __importDefault(require("../utils/api-error"));
const sendErrorOnProduction = (error, res) => {
    return res.status(error.statuscode).json({
        status: error.status,
        message: error.message,
    });
};
const sendErrorOnDevelopment = (error, res) => {
    return res.status(error.statuscode).json({
        status: error.status,
        message: error.message,
        stack: error.stack,
    });
};
const invalidJWTSignature = () => new api_error_1.default("Invalid Token!", 401);
const expiredJWTtoken = () => new api_error_1.default("Expired Token!", 401);
const globalErrorHandler = (error, req, res, next) => {
    error.statuscode = error.statuscode || 500;
    error.status = error.status || "fail";
    if (process.env.NODE_ENV === "Development") {
        return sendErrorOnDevelopment(error, res);
    }
    else {
        if (error.name === "JsonWebTokenError")
            error = invalidJWTSignature();
        if (error.name === "TokenExpiredError")
            error = expiredJWTtoken();
        return sendErrorOnProduction(error, res);
    }
};
exports.default = globalErrorHandler;
//# sourceMappingURL=global-error-handling.js.map