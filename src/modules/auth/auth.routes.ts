import { Router } from 'express';

import { uploadSingleImage } from '../../shared/middlewares/multer';
import authController from './auth.controller';

const router: Router = Router();

router.post('/login', authController.login);
router.post('/signup', uploadSingleImage('avatar'), authController.signup);

export default router;