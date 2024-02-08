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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateUserPassword = exports.validateUpdateUserData = exports.validateGetSpecificUser = exports.validateCreateUser = void 0;
const express_validator_1 = require("express-validator");
const bcrypt = __importStar(require("bcrypt"));
const validator_1 = require("../../shared/middlewares/validator");
const user_model_1 = require("./user.model");
exports.validateCreateUser = [
    (0, express_validator_1.check)("username")
        .notEmpty()
        .withMessage("Username is required!")
        .isString()
        .withMessage("Invalid username!")
        .isLength({ min: 3, max: 32 })
        .withMessage("Username must be between 3 to 32 characters!")
        .custom(async (value) => {
        const user = await user_model_1.UserModel.findOne({ username: value });
        if (user) {
            throw new Error("Unavailable username!");
        }
    }),
    (0, express_validator_1.check)("email")
        .notEmpty()
        .withMessage("Email is required!")
        .isEmail()
        .withMessage("Invalid Email!")
        .custom(async (value) => {
        const user = await user_model_1.UserModel.findOne({ email: value });
        if (user) {
            throw new Error("Email already in use!");
        }
    }),
    (0, express_validator_1.check)("password")
        .notEmpty()
        .withMessage("Password is required!")
        .isStrongPassword()
        .withMessage("Password must contain uppercase, lowercase, and special character and must be at least 8 characters length long!"),
    (0, express_validator_1.check)("passwordConfirmation").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Password and Password confirmation does not match!");
        }
        return true;
    }),
    validator_1.validateSchema,
];
exports.validateGetSpecificUser = [
    (0, express_validator_1.check)("id")
        .notEmpty()
        .withMessage("User id is required!")
        .isMongoId()
        .withMessage("Invalid user id!")
        .custom(async (value) => {
        const user = await user_model_1.UserModel.findById(value);
        if (!user) {
            throw new Error(`No user found with id ${value}!`);
        }
    }),
    validator_1.validateSchema,
];
exports.validateUpdateUserData = [
    (0, express_validator_1.check)("username")
        .optional()
        .isString()
        .withMessage("Invalid username!")
        .isLength({ min: 3, max: 32 })
        .withMessage("Username must be between 3 to 32 characters!")
        .custom(async (value) => {
        const user = await user_model_1.UserModel.findOne({ username: value });
        if (user) {
            throw new Error("Unavailable username!");
        }
    }),
    (0, express_validator_1.check)("email")
        .optional()
        .isEmail()
        .withMessage("Invalid Email!")
        .custom(async (value) => {
        const user = await user_model_1.UserModel.findOne({ email: value });
        if (user) {
            throw new Error("Email already in use!");
        }
    }),
    validator_1.validateSchema,
];
exports.validateUpdateUserPassword = [
    (0, express_validator_1.check)('currentPassword').notEmpty().withMessage('Old password is required!').isString().custom(async (value, { req }) => {
        const user = await user_model_1.UserModel.findOne({ _id: req.user.id });
        if (!await bcrypt.compare(value, user.password)) {
            throw new Error("Current password is incorrect!");
        }
    }),
    (0, express_validator_1.check)("newPassword")
        .notEmpty()
        .withMessage("Password is required!")
        .isStrongPassword()
        .withMessage("Password must contain uppercase, lowercase, and special character and must be at least 8 characters length long!"),
    (0, express_validator_1.check)("newPasswordConfirmation").custom((value, { req }) => {
        if (value !== req.body.newPassword) {
            throw new Error("Password and Password confirmation does not match!");
        }
        return true;
    }),
    validator_1.validateSchema,
];
//# sourceMappingURL=user.validator.js.map