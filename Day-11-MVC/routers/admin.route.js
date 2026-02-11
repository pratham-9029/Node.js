import { Router } from "express";
import adminController from "../controller/admin.controller.js";
import { isAdmin } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const adminRouter = Router();

// All admin routes require admin authentication
adminRouter.use(isAdmin);

// Dashboard
adminRouter.get("/", adminController.dashboard);

// Movie management
adminRouter.get("/movies", adminController.moviesList);
adminRouter.get("/movies/add", adminController.addMoviePage);
adminRouter.post("/movies/add", upload.single("poster"), adminController.addMovie);
adminRouter.get("/movies/edit/:id", adminController.editMoviePage);
adminRouter.post("/movies/edit/:id", upload.single("poster"), adminController.editMovie);
adminRouter.post("/movies/delete/:id", adminController.deleteMovie);

// User management
adminRouter.get("/users", adminController.usersList);
adminRouter.post("/users/toggle/:id", adminController.toggleUser);

// Review moderation
adminRouter.get("/reviews", adminController.reviewsList);
adminRouter.post("/reviews/status/:id", adminController.updateReviewStatus);

// TMDB Integration
adminRouter.get("/tmdb/search", adminController.tmdbSearch);
adminRouter.post("/tmdb/import/:tmdbId", adminController.tmdbImport);

// Analytics
adminRouter.get("/analytics/data", adminController.analyticsData);

export default adminRouter;
