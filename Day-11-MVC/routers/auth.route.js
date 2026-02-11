import { Router } from "express";
import authController from "../controller/auth.controller.js";
import { isGuest } from "../middleware/auth.js";

const authRouter = Router();

authRouter.get("/login", isGuest, authController.loginPage);
authRouter.post("/login", isGuest, authController.login);
authRouter.get("/register", isGuest, authController.registerPage);
authRouter.post("/register", isGuest, authController.register);
authRouter.get("/logout", authController.logout);

export default authRouter;
