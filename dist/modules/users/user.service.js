"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const code_factor_1 = require("../../shared/utils/code-factor");
const sanitize_data_1 = require("../../shared/utils/sanitize-data");
const api_error_1 = __importDefault(require("../../shared/utils/api-error"));
const user_model_1 = require("./user.model");
class UserService {
    constructor() {
        this.sanitizeData = new sanitize_data_1.SanitizeData();
    }
    async createUser(data) {
        try {
            data.avatar = data.avatar
                ? await (0, code_factor_1.uploadToCloudinary)(data.avatar, {
                    format: "jpg",
                    public_id: `${Date.now()}-avatar`,
                    folder: "/users/avatars",
                })
                : undefined;
            const user = (await user_model_1.UserModel.create(data));
            if (!user) {
                throw new api_error_1.default("Error while creating new account, please try again later!", 400);
            }
            return this.sanitizeData.sanitizeUser(user);
        }
        catch (error) {
            console.log(error);
            throw new api_error_1.default("Error while creating new account, please try again later!", 500);
        }
    }
    async getAllUsers(reqQuery) {
        try {
            const users = (await user_model_1.UserModel.find());
            if (!users) {
                throw new api_error_1.default("Error while retrieving data, please try again later!", 400);
            }
            let sanitizedUsers = [];
            for (const user of users) {
                sanitizedUsers.push(this.sanitizeData.sanitizeUser(user));
            }
            return sanitizedUsers;
        }
        catch (error) {
            console.log(error);
            throw new api_error_1.default("Error while retrieving data, please try again later!", 500);
        }
    }
    async getUserById(id) {
        try {
            const user = (await user_model_1.UserModel.findById(id));
            if (!user) {
                throw new api_error_1.default("User not found!", 404);
            }
            return this.sanitizeData.sanitizeUser(user);
        }
        catch (error) {
            throw new api_error_1.default(error.message, 500);
        }
    }
    async getUserByEmailOrUsername(searchObj) {
        try {
            const user = (await user_model_1.UserModel.findOne({
                $or: [{ email: searchObj }, { username: searchObj }],
            }));
            if (!user) {
                throw new api_error_1.default("User not found!", 404);
            }
            return user;
        }
        catch (error) {
            console.log(error);
            throw new api_error_1.default("Error while retrieving data, please try again later!", 500);
        }
    }
    async updateUserData(data) {
        try {
            data.avatar = data.avatar
                ? await (0, code_factor_1.uploadToCloudinary)(data.avatar, {
                    format: "jpg",
                    public_id: `${Date.now()}-avatar`,
                    folder: "/users/avatars",
                })
                : undefined;
            const user = (await user_model_1.UserModel.findByIdAndUpdate(data.id, data));
            if (!user) {
                throw new api_error_1.default("User not found!", 404);
            }
            return this.sanitizeData.sanitizeUser(user);
        }
        catch (error) {
            throw new api_error_1.default(error.message, 500);
        }
    }
    async updateUserPassword(data) {
        try {
            const user = (await user_model_1.UserModel.findByIdAndUpdate(data.id, data));
            if (!user) {
                throw new api_error_1.default("User not found!", 404);
            }
            return this.sanitizeData.sanitizeUser(user);
        }
        catch (error) {
            console.log(error);
            throw new api_error_1.default("Error while retrieving data, please try again later!", 500);
        }
    }
    async deleteUser(id) {
        try {
            const user = await user_model_1.UserModel.findByIdAndDelete(id);
            if (!user) {
                throw new api_error_1.default("User not found!", 404);
            }
        }
        catch (error) {
            console.log(error);
            throw new api_error_1.default("Error while retrieving data, please try again later!", 500);
        }
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map