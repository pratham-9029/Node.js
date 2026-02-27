import { Router } from "express";
import adminRouter from "./adminPanel.route.js";

const router = Router();

router.use(adminRouter);

export default router;