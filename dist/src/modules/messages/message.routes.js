"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authorization_1 = require("../../shared/middlewares/authorization");
const message_controller_1 = __importDefault(require("./message.controller"));
const messages_validator_1 = require("./messages.validator");
const router = (0, express_1.Router)({ mergeParams: true });
router.route("/")
    .post((0, authorization_1.isAuthorized)(), messages_validator_1.validateSendMessage, message_controller_1.default.createMessage)
    .get((0, authorization_1.isAuthorized)(), message_controller_1.default.getAllMessages);
exports.default = router;
//# sourceMappingURL=message.routes.js.map