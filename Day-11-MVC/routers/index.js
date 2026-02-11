import { Router } from "express";
import adminRouter from "./admin.route.js";
import authRouter from "./auth.route.js";
import userRouter from "./user.route.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/admin", adminRouter);
router.use("/", userRouter);

export default router;