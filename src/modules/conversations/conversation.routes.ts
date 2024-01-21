import { Router } from "express";

import { validateCreateConversationData } from "./conversation.validator";
import { isAuthorized } from "../../shared/middlewares/authorization";
import messageRoutes from '../messages/message.routes'
import conversationController from "./conversation.controller";

const router: Router = Router();

router
  .route("/")
  .post(isAuthorized(), validateCreateConversationData, conversationController.createConversation)
  .get(isAuthorized(), conversationController.getConversations);

router.use('/:conversationId/messages', messageRoutes)

export default router;
