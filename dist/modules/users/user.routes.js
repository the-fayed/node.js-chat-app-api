"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authorization_1 = require("../../shared/middlewares/authorization");
const user_controller_1 = __importDefault(require("./user.controller"));
const user_validator_1 = require("./user.validator");
const router = (0, express_1.Router)();
router.route("/").get((0, authorization_1.isAuthorized)(), user_controller_1.default.getAllUsers);
router.patch("/update-data", (0, authorization_1.isAuthorized)(), user_validator_1.validateUpdateUserData, user_controller_1.default.updateUserData);
router.patch("/update-password", (0, authorization_1.isAuthorized)(), user_validator_1.validateUpdateUserPassword, user_controller_1.default.updateUserPassword);
router
    .route("/:id")
    .get((0, authorization_1.isAuthorized)(), user_validator_1.validateGetSpecificUser, user_controller_1.default.getUserById)
    .delete((0, authorization_1.isAuthorized)(), user_validator_1.validateDeleteUser, user_controller_1.default.deleteUser);
exports.default = router;
//# sourceMappingURL=user.routes.js.map