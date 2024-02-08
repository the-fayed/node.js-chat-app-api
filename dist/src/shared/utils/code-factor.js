"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = exports.uploadToCloudinary = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cloudinary_1 = __importDefault(require("../../config/cloudinary"));
const api_error_1 = __importDefault(require("./api-error"));
const uploadToCloudinary = async (filename, opt) => {
    try {
        return (await cloudinary_1.default.uploader.upload(filename, opt)).url;
    }
    catch (error) {
        console.log("Error while trying to upload image to Cloudinary", error);
        throw new api_error_1.default("Error while creating new account, please try again later!", 400);
    }
};
exports.uploadToCloudinary = uploadToCloudinary;
const generateAccessToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};
exports.generateAccessToken = generateAccessToken;
//# sourceMappingURL=code-factor.js.map