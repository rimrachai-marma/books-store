import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validateRequest } from "../../middleware/validation";
import { signupSchema, loginSchema } from "./auth.validation";

const router = Router();
const authController = new AuthController();

router.post("/signup", validateRequest(signupSchema), authController.signup);
router.post("/login", validateRequest(loginSchema), authController.login);

export default router;
