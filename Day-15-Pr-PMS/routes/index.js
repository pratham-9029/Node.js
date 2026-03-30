import { Router } from "express";
import apiRouter from "./api/index.js";
import adminRouter from "./admin.route.js";

const router = Router();

router.use('/', adminRouter);
router.use('/api',apiRouter);

export default router;