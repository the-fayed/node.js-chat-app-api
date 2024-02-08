"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const conversation_validator_1 = require("./conversation.validator");
const authorization_1 = require("../../shared/middlewares/authorization");
const message_routes_1 = __importDefault(require("../messages/message.routes"));
const conversation_controller_1 = __importDefault(require("./conversation.controller"));
const router = (0, express_1.Router)();
router
    .route("/")
    .post((0, authorization_1.isAuthorized)(), conversation_validator_1.validateCreateConversationData, conversation_controller_1.default.createConversation)
    .get((0, authorization_1.isAuthorized)(), conversation_controller_1.default.getConversations);
router.use('/:conversationId/messages', message_routes_1.default);
exports.default = router;
//# sourceMappingURL=conversation.routes.js.map