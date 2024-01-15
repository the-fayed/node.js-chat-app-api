import { Router } from "express";

import { uploadSingleImage } from "../../shared/middlewares/multer";
import {
  validateCreateUser,
  validateDeleteUser,
  validateGetSpecificUser,
  validateUpdateUserData,
  validateUpdateUserPassword,
} from "./user.validator";
import userController from "./user.controller";

const router: Router = Router();

router
  .route("/")
  .post(uploadSingleImage("avatar"), validateCreateUser, userController.createUser)
  .get(userController.getAllUsers);
router.patch("/update-data", validateUpdateUserData, userController.updateUserData);
router.patch("/update-password", validateUpdateUserPassword, userController.updateUserPassword);
router
  .route("/:id")
  .get(validateGetSpecificUser, userController.getSpecificUser)
  .delete(validateDeleteUser, userController.deleteUser);

export default router;
