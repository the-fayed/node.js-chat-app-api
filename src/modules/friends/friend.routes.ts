import { Router } from "express";

import { isAuthorized } from "../../shared/middlewares/authorization";
import {
  validateAcceptAndRejectFriendRequestData,
  validateDeleteFriendData,
  validateSendOrCancelFriendRequestData,
} from "./friend.validator";
import friendController from "./friend.controller";

const router: Router = Router({ mergeParams: true });

router
  .route("/friend-request")
  .post(isAuthorized(), validateSendOrCancelFriendRequestData, friendController.sendFriendRequest)
  .delete(isAuthorized(), validateSendOrCancelFriendRequestData, friendController.cancelFriendRequest);

router
  .route("/:senderId")
  .post(isAuthorized(), validateAcceptAndRejectFriendRequestData, friendController.acceptFriendRequest)
  .delete(isAuthorized(), validateAcceptAndRejectFriendRequestData, friendController.rejectFriendRequest);

router.get("/friend-requests", isAuthorized(), friendController.getAllFriendRequests);
router.get("/", isAuthorized(), friendController.getAllFriends);

router.delete("/delete/:friendId", isAuthorized(), validateDeleteFriendData, friendController.deleteFriend);

export default router;
