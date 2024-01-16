import { Router } from "express";

import { isAuthorized } from '../../shared/middlewares/authorization';
import userController from "./user.controller";
import {
  validateDeleteUser,
  validateGetSpecificUser,
  validateUpdateUserData,
  validateUpdateUserPassword,
} from "./user.validator";

const router: Router = Router();

router.route("/").get(userController.getAllUsers);
router.patch("/update-data", isAuthorized(), validateUpdateUserData, userController.updateUserData);
router.patch("/update-password", validateUpdateUserPassword, userController.updateUserPassword);
router
  .route("/:id")
  .get(validateGetSpecificUser, userController.getUserById)
  .delete(validateDeleteUser, userController.deleteUser);

export default router;
