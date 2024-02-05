import { Router } from "express";

import { isAuthorized } from "../../shared/middlewares/authorization";
import friendRoutes from "../friends/friend.routes";
import userController from "./user.controller";
import {
  validateGetSpecificUser,
  validateUpdateUserData,
  validateUpdateUserPassword,
} from "./user.validator";

const router: Router = Router();

router.route("/").get(isAuthorized(), userController.getAllUsers);
router.get("/logged-user", isAuthorized(), userController.getLoggedUser);
router.patch("/update-data", isAuthorized(), validateUpdateUserData, userController.updateUserData);
router.patch("/update-password", isAuthorized(), validateUpdateUserPassword, userController.updateUserPassword);
router.get("/:id", isAuthorized(), validateGetSpecificUser, userController.getUserById);
router.delete("/delete-account", isAuthorized(), userController.deleteUser);

router.use("/:receiverId/friends", friendRoutes);

export default router;
