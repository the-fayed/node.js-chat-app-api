import { Router } from "express";

import {
  validateDeleteUser,
  validateGetSpecificUser,
  validateUpdateUserData,
  validateUpdateUserPassword,
} from "./user.validator";
import userController from "./user.controller";

const router: Router = Router();

router.route("/").get(userController.getAllUsers);
router.patch("/update-data", validateUpdateUserData, userController.updateUserData);
router.patch("/update-password", validateUpdateUserPassword, userController.updateUserPassword);
router
  .route("/:id")
  .get(validateGetSpecificUser, userController.getUserById)
  .delete(validateDeleteUser, userController.deleteUser);

export default router;
