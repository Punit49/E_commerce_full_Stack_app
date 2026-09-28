import { Router } from "express";
import { getMeController, loginController, logoutController, refreshTokenController, registerController } from "../controllers/auth.controllers.js";
import { loginValidation, registerValidation } from "../validations/auth.validation.js";
import isAuthenticated from "../middlewares/auth.middleware.js";
const router = Router();

router.post("/register", registerValidation, registerController);
router.post("/login", loginValidation, loginController);
router.post("/refresh-token", refreshTokenController);
router.post("/logout", isAuthenticated, logoutController);
router.get("/me", isAuthenticated, getMeController)

export default router;