import { Router } from "express";

import { isAuthorized } from "../../shared/middlewares/authorization";
import conversationController from "./conversation.controller";
import { validateCreateConversationData } from "./conversation.validator";

const router: Router = Router();

router
  .route("/")
  .post(isAuthorized(), validateCreateConversationData, conversationController.createConversation)
  .get(isAuthorized(), conversationController.getConversations);

export default router;
