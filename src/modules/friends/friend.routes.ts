import { Router } from "express";

import { isAuthorized } from "../../shared/middlewares/authorization";
import {
  validateAcceptAndRejectFriendRequestData,
  validateDeleteFriendData,
  validateSendOrCancelFriendRequestData,
} from "./friend.validator";
import friendController from "./friend.controller";

const router: Router = Router({ mergeParams: true });

router.post(
  "/send-friend-request",
  isAuthorized(),
  validateSendOrCancelFriendRequestData,
  friendController.sendFriendRequest
);

router.post(
  "/cancel-friend-request",
  isAuthorized(),
  validateSendOrCancelFriendRequestData,
  friendController.cancelFriendRequest
);

router.post(
  "/accept-friend-request",
  isAuthorized(),
  validateAcceptAndRejectFriendRequestData,
  friendController.acceptFriendRequest
);

router.post(
  "/reject-friend-request",
  isAuthorized(),
  validateAcceptAndRejectFriendRequestData,
  friendController.rejectFriendRequest
);

router.get("/friend-requests", isAuthorized(), friendController.getAllFriendRequests);
router.get("/", isAuthorized(), friendController.getAllFriends);

router.delete(
  "/delete-friend",
  isAuthorized(),
  validateDeleteFriendData,
  friendController.deleteFriend
);

export default router;
