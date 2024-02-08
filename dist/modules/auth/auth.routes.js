"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_validator_1 = require("./auth.validator");
const multer_1 = require("../../shared/middlewares/multer");
const auth_controller_1 = __importDefault(require("./auth.controller"));
const router = (0, express_1.Router)();
router.post("/signup", (0, multer_1.uploadSingleImage)("avatar"), auth_validator_1.validateSignupData, auth_controller_1.default.signup);
router.post("/login", auth_validator_1.validateLoginData, auth_controller_1.default.login);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map