import { Router } from "express";
import adminPanelController from "../controllers/adminPane.controller.js";
import auth from "../middleware/auth.js";

const adminRouter = Router();

adminRouter.get('/admin', auth, adminPanelController.adminDashboard);

adminRouter.get('/login', adminPanelController.loginPage);
adminRouter.post('/login', adminPanelController.loginUser);

adminRouter.get('/register', adminPanelController.registerPage);
adminRouter.post('/register', adminPanelController.registerUser);

adminRouter.get('/logout', adminPanelController.logoutUser)

export default adminRouter;