"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const code_factor_1 = require("../../shared/utils/code-factor");
const sanitize_data_1 = require("../../shared/utils/sanitize-data");
const api_feature_1 = require("../../shared/utils/api-feature");
const api_error_1 = __importDefault(require("../../shared/utils/api-error"));
const user_model_1 = require("./user.model");
class UserService {
    constructor() {
        this.sanitizeData = new sanitize_data_1.SanitizeData();
    }
    async createUser(data) {
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
    async getAllUsers(reqQuery) {
        const documentCount = await user_model_1.UserModel.countDocuments();
        const apiFeature = new api_feature_1.ApiFeature(user_model_1.UserModel.find({}), reqQuery)
            .paginate(documentCount)
            .sort()
            .search();
        const { MongooseQuery, PaginationResult } = apiFeature;
        const users = await MongooseQuery;
        let sanitizeUsers = [];
        for (let user of users) {
            const sanitizeUser = this.sanitizeData.sanitizeUser(user);
            sanitizeUsers.push(sanitizeUser);
        }
        return { documents: sanitizeUsers, paginationResults: PaginationResult };
    }
    async getUserById(id) {
        const user = (await user_model_1.UserModel.findById(id));
        if (!user) {
            throw new api_error_1.default("User not found!", 404);
        }
        return this.sanitizeData.sanitizeUser(user);
    }
    async getUserByEmailOrUsername(searchObj) {
        const user = (await user_model_1.UserModel.findOne({
            $or: [{ email: searchObj }, { username: searchObj }],
        }));
        return user;
    }
    async updateUserData(data) {
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
    async updateUserPassword(data) {
        const user = (await user_model_1.UserModel.findByIdAndUpdate(data.id, data));
        if (!user) {
            throw new api_error_1.default("User not found!", 404);
        }
        return this.sanitizeData.sanitizeUser(user);
    }
    async deleteUser(id) {
        const user = await user_model_1.UserModel.findByIdAndDelete(id);
        if (!user) {
            throw new api_error_1.default("User not found!", 404);
        }
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map