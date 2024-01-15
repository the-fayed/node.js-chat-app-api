import { Router } from 'express';

import { uploadSingleImage } from '../../shared/middlewares/multer';
import userController from './user.controller';

const router: Router = Router();

router.route('/').post(uploadSingleImage('avatar'), userController.createUser).get(userController.getAllUsers);
router.patch('/update-data', userController.updateUserData);
router.patch('/update-password', userController.updateUserPassword);
router.delete('/:id', userController.deleteUser);

export default router;