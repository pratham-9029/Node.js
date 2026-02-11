import { Router } from "express";
import movieController from "../controller/movie.controller.js";
import watchlistController from "../controller/watchlist.controller.js";
import { isAuthenticated } from "../middleware/auth.js";

const userRouter = Router();

// Public routes
userRouter.get("/", movieController.homePage);
userRouter.get("/discover", movieController.discover);
userRouter.get("/movie/:slug", movieController.movieDetail);

// Authenticated routes
userRouter.post("/movie/:id/review", isAuthenticated, movieController.submitReview);
userRouter.post("/review/:id/like", isAuthenticated, movieController.toggleLike);

// Watchlist routes
userRouter.get("/watchlist", isAuthenticated, watchlistController.watchlistPage);
userRouter.post("/watchlist/add", isAuthenticated, watchlistController.addToWatchlist);
userRouter.put("/watchlist/update/:id", isAuthenticated, watchlistController.updateWatchlistEntry);
userRouter.delete("/watchlist/remove/:id", isAuthenticated, watchlistController.removeFromWatchlist);

// Profile
userRouter.get("/profile", isAuthenticated, watchlistController.profilePage);

export default userRouter;
