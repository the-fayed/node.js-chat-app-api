"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLoginData = exports.validateSignupData = void 0;
const express_validator_1 = require("express-validator");
const validator_1 = require("../../shared/middlewares/validator");
const user_model_1 = require("../users/user.model");
exports.validateSignupData = [
    (0, express_validator_1.check)("email")
        .notEmpty()
        .withMessage("Email is required!")
        .isEmail()
        .withMessage("please provide a valid email!")
        .custom(async (value) => {
        const user = await user_model_1.UserModel.findOne({ email: value });
        if (user) {
            throw new Error("Email already in use!");
        }
    }),
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
    (0, express_validator_1.check)("password")
        .notEmpty()
        .withMessage("Password is required!")
        .isStrongPassword()
        .withMessage("Week password, password must contatin an uppercase, lowercase, spicial character, number and be at least 8 numbers and characters!")
        .isLength({ min: 8, max: 256 })
        .withMessage("Password length is out of range!"),
    (0, express_validator_1.check)("passwordConfirmation").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Password and passwor confirmation dose not match!");
        }
        return true;
    }),
    validator_1.validateSchema,
];
exports.validateLoginData = [
    (0, express_validator_1.check)("email").optional().isEmail().withMessage("please provide a valid email!"),
    (0, express_validator_1.check)("username").optional().isString().isLength({ min: 3, max: 32 }).withMessage("username length out of range!"),
    (0, express_validator_1.check)("password")
        .notEmpty()
        .isString()
        .withMessage("Invalid password!")
        .isLength({ min: 8, max: 256 })
        .withMessage("Password length is out of range"),
    validator_1.validateSchema,
];
//# sourceMappingURL=auth.validator.js.map