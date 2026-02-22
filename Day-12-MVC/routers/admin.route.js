import { Router } from "express";
import adminController from "../controller/admin.controller.js";
import imageUploads from "../middleware/imageUploads.js";

const adminRouter = Router();

adminRouter.get('/', adminController.homePage);

adminRouter.get('/add-shoe', adminController.addShoePage);
adminRouter.post('/add-shoe', imageUploads, adminController.addShoe);

adminRouter.get('/view-shoe', adminController.viewShoe);

adminRouter.get('/delete/:id', adminController.deleteShoe);

adminRouter.get('/edit/:id', adminController.editShoePage);
adminRouter.post('/edit/:id', imageUploads, adminController.editShoe);

export default adminRouter;