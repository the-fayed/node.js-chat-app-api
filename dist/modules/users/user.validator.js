"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDeleteUser = exports.validateUpdateUserPassword = exports.validateUpdateUserData = exports.validateGetSpecificUser = exports.validateCreateUser = void 0;
const express_validator_1 = require("express-validator");
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
exports.validateDeleteUser = [
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
//# sourceMappingURL=user.validator.js.map