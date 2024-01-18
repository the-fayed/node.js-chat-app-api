import { Router } from "express";

import { isAuthorized } from "../../shared/middlewares/authorization";
import messageController from "./message.controller";

const router: Router = Router();

router.route("/:conversationId")
  .post(isAuthorized(), messageController.createMessage)
  .get(messageController.getAllMessages);

export default router;

