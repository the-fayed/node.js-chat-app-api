"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authorization_1 = require("../../shared/middlewares/authorization");
const friend_validator_1 = require("./friend.validator");
const friend_controller_1 = __importDefault(require("./friend.controller"));
const router = (0, express_1.Router)({ mergeParams: true });
router
    .route("/friend-request")
    .post((0, authorization_1.isAuthorized)(), friend_validator_1.validateSendOrCancelFriendRequestData, friend_controller_1.default.sendFriendRequest)
    .delete((0, authorization_1.isAuthorized)(), friend_validator_1.validateSendOrCancelFriendRequestData, friend_controller_1.default.cancelFriendRequest);
router
    .route("/:senderId")
    .post((0, authorization_1.isAuthorized)(), friend_validator_1.validateAcceptAndRejectFriendRequestData, friend_controller_1.default.acceptFriendRequest)
    .delete((0, authorization_1.isAuthorized)(), friend_validator_1.validateAcceptAndRejectFriendRequestData, friend_controller_1.default.rejectFriendRequest);
router.get("/friend-requests", (0, authorization_1.isAuthorized)(), friend_controller_1.default.getAllFriendRequests);
router.get("/", (0, authorization_1.isAuthorized)(), friend_controller_1.default.getAllFriends);
router.delete("/delete/:friendId", (0, authorization_1.isAuthorized)(), friend_validator_1.validateDeleteFriendData, friend_controller_1.default.deleteFriend);
exports.default = router;
//# sourceMappingURL=friend.routes.js.map