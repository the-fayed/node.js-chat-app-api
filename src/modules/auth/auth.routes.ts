import { Router } from "express";

import { validateLoginData, validateSignupData } from "./auth.validator";
import { uploadSingleImage } from "../../shared/middlewares/multer";
import authController from "./auth.controller";

const router: Router = Router();

router.post("/signup", uploadSingleImage("avatar"), validateSignupData, authController.signup);
router.post("/login", validateLoginData, authController.login);

export default router;
