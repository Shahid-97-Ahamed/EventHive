import { Router } from "express";
import { validate } from "../../middleware/validate.middleware";
import { loginSchema, signupSchema } from "./auth.validation";
import { authController } from "./auth.controller";

const router =Router();

router.post("/signup",validate(signupSchema),authController.signup);
router.post("/login",validate(loginSchema),authController.login);

export const authRouter =router;