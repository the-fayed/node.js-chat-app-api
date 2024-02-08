"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authorization_1 = require("../../shared/middlewares/authorization");
const friend_routes_1 = __importDefault(require("../friends/friend.routes"));
const user_controller_1 = __importDefault(require("./user.controller"));
const user_validator_1 = require("./user.validator");
const router = (0, express_1.Router)();
router.route("/").get((0, authorization_1.isAuthorized)(), user_controller_1.default.getAllUsers);
router.get("/logged-user", (0, authorization_1.isAuthorized)(), user_controller_1.default.getLoggedUser);
router.patch("/update-data", (0, authorization_1.isAuthorized)(), user_validator_1.validateUpdateUserData, user_controller_1.default.updateUserData);
router.patch("/update-password", (0, authorization_1.isAuthorized)(), user_validator_1.validateUpdateUserPassword, user_controller_1.default.updateUserPassword);
router.get("/:id", (0, authorization_1.isAuthorized)(), user_validator_1.validateGetSpecificUser, user_controller_1.default.getUserById);
router.delete("/delete-account", (0, authorization_1.isAuthorized)(), user_controller_1.default.deleteUser);
router.use("/:receiverId/friends", friend_routes_1.default);
exports.default = router;
//# sourceMappingURL=user.routes.js.map