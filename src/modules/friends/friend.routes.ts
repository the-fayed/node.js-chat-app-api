import { Router } from "express";

import { isAuthorized } from "../../shared/middlewares/authorization";
import { validateAcceptAndRejectFriendRequestData, validateSendFriendRequestData } from "./friend.validator";
import friendController from "./friend.controller";

const router: Router = Router();

router.post(
  "/send-friend-request",
  isAuthorized(),
  validateSendFriendRequestData,
  friendController.sendFriendRequest
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

export default router;
