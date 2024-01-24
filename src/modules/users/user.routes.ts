import { Router } from "express";

import { isAuthorized } from '../../shared/middlewares/authorization';
import friendRoutes from '../friends/friend.routes';
import userController from "./user.controller";
import {
  validateDeleteUser,
  validateGetSpecificUser,
  validateUpdateUserData,
  validateUpdateUserPassword,
} from "./user.validator";


const router: Router = Router();

router.route("/").get(isAuthorized(), userController.getAllUsers);
router.patch("/update-data", isAuthorized(), validateUpdateUserData, userController.updateUserData);
router.patch("/update-password",isAuthorized(), validateUpdateUserPassword, userController.updateUserPassword);
router
  .route("/:id")
  .get( isAuthorized(),validateGetSpecificUser, userController.getUserById)
  .delete(isAuthorized(), validateDeleteUser, userController.deleteUser);

router.use('/:userId/friends', friendRoutes);

export default router;
