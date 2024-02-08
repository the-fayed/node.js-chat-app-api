"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt = __importStar(require("bcrypt"));
const code_factor_1 = require("../../shared/utils/code-factor");
const sanitize_data_1 = require("../../shared/utils/sanitize-data");
const api_error_1 = __importDefault(require("../../shared/utils/api-error"));
const user_service_1 = require("../users/user.service");
class AuthService {
    constructor() {
        this.sanitizeData = new sanitize_data_1.SanitizeData();
        this.userService = new user_service_1.UserService();
    }
    async signup(data) {
        const user = (await this.userService.createUser(data));
        if (!user) {
            throw new api_error_1.default("Error while creating your account, please try again later!", 500);
        }
        const token = (0, code_factor_1.generateAccessToken)({ userId: user.id });
        return {
            user: this.sanitizeData.sanitizeUser(user),
            accessToken: token,
        };
    }
    async login(data) {
        // check if user exists
        const user = await this.userService.getUserByEmailOrUsername(data.emailOrUsername);
        if (!user) {
            throw new api_error_1.default("Invalid credentials!", 401);
        }
        // check if the password matches
        const passwordMatch = await bcrypt.compare(data.password, user.password);
        if (!passwordMatch) {
            throw new api_error_1.default("Invalid credentials!", 401);
        }
        // preparing the response data
        const token = (0, code_factor_1.generateAccessToken)({ userId: user.id });
        return { user: this.sanitizeData.sanitizeUser(user), accessToken: token };
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map