import { Router } from "express";
import adminController from "../controllers/admin.controller.js";

const adminRouter = Router();

adminRouter.get('/',adminController.homePage);
adminRouter.get('/add-movie',adminController.addMoviePage);
adminRouter.get('/view-movies',adminController.viewMoviesPage);

export default adminRouter;