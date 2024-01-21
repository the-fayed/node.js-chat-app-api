import { Router } from "express";

import { isAuthorized } from "../../shared/middlewares/authorization";
import messageController from "./message.controller";
import { validateSendMessage } from './messages.validator';

const router: Router = Router({ mergeParams: true });

router.route("/")
  .post(isAuthorized(),validateSendMessage, messageController.createMessage)
  .get(isAuthorized(), messageController.getAllMessages);

export default router;

