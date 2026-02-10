import { Router } from 'express';
import { AuthController } from './auth.controller';
// import { validateRequest } from '../../middleware/validation';
// import { signupSchema, loginSchema } from './auth.validation';

const router = Router();
const authController = new AuthController();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

export default router;