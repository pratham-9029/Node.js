import { Router } from "express";
import adminPanelController from "../controllers/adminPane.controller.js";
import auth from "../middleware/auth.js";
import passport from "passport";

const adminRouter = Router();

adminRouter.get('/admin', auth, adminPanelController.adminDashboard);

adminRouter.get('/login', adminPanelController.loginPage);
adminRouter.post('/login', passport.authenticate('local', {
    successRedirect : '/admin',
    failureRedirect : '/login'
}));

adminRouter.get('/register', adminPanelController.registerPage);
adminRouter.post('/register', adminPanelController.registerUser);

adminRouter.get('/logout', adminPanelController.logoutUser);

adminRouter.get('/view-registered-users', auth, adminPanelController.viewRegisteredUsers);

export default adminRouter;