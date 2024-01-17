import { Router } from "express";

import { isAuthorized } from "../../shared/middlewares/authorization";
import conversationController from "./conversation.controller";

const router: Router = Router();

router
  .route("/")
  .post(isAuthorized(), conversationController.createConversation)
  .get(isAuthorized(), conversationController.getConversations);

export default router;
