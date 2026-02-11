import Movie from "../models/Movie.js";
import User from "../models/User.js";
import Review from "../models/Review.js";
import Watchlist from "../models/Watchlist.js";
import axios from "axios";
import { envConfig } from "../configs/dotenv.js";

const adminController = {
    // GET /admin — Dashboard
    dashboard: async (req, res) => {
        try {
            const [
                totalMovies,
                totalUsers,
                totalReviews,
                publishedMovies,
                draftMovies,
                recentMovies,
                recentUsers,
                recentReviews,
                genreStats,
                topRatedMovies
            ] = await Promise.all([
                Movie.countDocuments(),
                User.countDocuments({ role: "user" }),
                Review.countDocuments(),
                Movie.countDocuments({ status: "published" }),
                Movie.countDocuments({ status: "draft" }),
                Movie.find().sort({ createdAt: -1 }).limit(5).lean(),
                User.find({ role: "user" }).sort({ createdAt: -1 }).limit(5).lean(),
                Review.find().sort({ createdAt: -1 }).limit(5)
                    .populate("user", "username avatar")
                    .populate("movie", "title poster slug")
                    .lean(),
                Movie.aggregate([
                    { $unwind: "$genres" },
                    { $group: { _id: "$genres", count: { $sum: 1 } } },
                    { $sort: { count: -1 } },
                    { $limit: 10 }
                ]),
                Movie.find({ status: "published", "ratings.count": { $gt: 0 } })
                    .sort({ "ratings.overall": -1 })
                    .limit(5)
                    .lean()
            ]);

            res.render("admin/dashboard", {
                title: "Admin Dashboard — CineVerse",
                stats: { totalMovies, totalUsers, totalReviews, publishedMovies, draftMovies },
                recentMovies,
                recentUsers,
                recentReviews,
                genreStats,
                topRatedMovies
            });
        } catch (error) {
            console.error("Dashboard error:", error);
            res.render("admin/dashboard", {
                title: "Admin Dashboard — CineVerse",
                stats: { totalMovies: 0, totalUsers: 0, totalReviews: 0, publishedMovies: 0, draftMovies: 0 },
                recentMovies: [],
                recentUsers: [],
                recentReviews: [],
                genreStats: [],
                topRatedMovies: []
            });
        }
    },

    // GET /admin/movies — Movie management
    moviesList: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = 12;
            const skip = (page - 1) * limit;
            const search = req.query.search || "";
            const status = req.query.status || "";
            const genre = req.query.genre || "";

            let filter = {};
            if (search) {
                filter.$or = [
                    { title: { $regex: search, $options: "i" } },
                    { director: { $regex: search, $options: "i" } }
                ];
            }
            if (status) filter.status = status;
            if (genre) filter.genres = genre;

            const [movies, total] = await Promise.all([
                Movie.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
                Movie.countDocuments(filter)
            ]);

            res.render("admin/movies", {
                title: "Manage Movies — CineVerse",
                movies,
                pagination: {
                    page,
                    totalPages: Math.ceil(total / limit),
                    total
                },
                filters: { search, status, genre }
            });
        } catch (error) {
            console.error("Movies list error:", error);
            res.redirect("/admin");
        }
    },

    // GET /admin/movies/add
    addMoviePage: (req, res) => {
        res.render("admin/add-movie", {
            title: "Add Movie — CineVerse",
            movie: null,
            error: null
        });
    },

    // POST /admin/movies/add
    addMovie: async (req, res) => {
        try {
            const movieData = { ...req.body };

            // Parse arrays from comma-separated strings
            if (typeof movieData.genres === "string") {
                movieData.genres = movieData.genres.split(",").map(g => g.trim()).filter(Boolean);
            }
            if (typeof movieData.mood === "string") {
                movieData.mood = movieData.mood.split(",").map(m => m.trim()).filter(Boolean);
            }

            // Parse cast from JSON string
            if (typeof movieData.cast === "string" && movieData.cast) {
                try {
                    movieData.cast = JSON.parse(movieData.cast);
                } catch {
                    movieData.cast = [];
                }
            }

            if (req.file) {
                movieData.poster = "/uploads/" + req.file.filename;
            }

            movieData.addedBy = req.session.user.id;

            const movie = new Movie(movieData);
            await movie.save();

            res.redirect("/admin/movies");
        } catch (error) {
            console.error("Add movie error:", error);
            res.render("admin/add-movie", {
                title: "Add Movie — CineVerse",
                movie: req.body,
                error: error.message
            });
        }
    },

    // GET /admin/movies/edit/:id
    editMoviePage: async (req, res) => {
        try {
            const movie = await Movie.findById(req.params.id).lean();
            if (!movie) return res.redirect("/admin/movies");

            res.render("admin/edit-movie", {
                title: "Edit Movie — CineVerse",
                movie,
                error: null
            });
        } catch (error) {
            res.redirect("/admin/movies");
        }
    },

    // POST /admin/movies/edit/:id
    editMovie: async (req, res) => {
        try {
            const movieData = { ...req.body };

            if (typeof movieData.genres === "string") {
                movieData.genres = movieData.genres.split(",").map(g => g.trim()).filter(Boolean);
            }
            if (typeof movieData.mood === "string") {
                movieData.mood = movieData.mood.split(",").map(m => m.trim()).filter(Boolean);
            }
            if (typeof movieData.cast === "string" && movieData.cast) {
                try {
                    movieData.cast = JSON.parse(movieData.cast);
                } catch {
                    movieData.cast = [];
                }
            }

            if (req.file) {
                movieData.poster = "/uploads/" + req.file.filename;
            }

            await Movie.findByIdAndUpdate(req.params.id, movieData, { new: true, runValidators: true });
            res.redirect("/admin/movies");
        } catch (error) {
            console.error("Edit movie error:", error);
            const movie = await Movie.findById(req.params.id).lean();
            res.render("admin/edit-movie", {
                title: "Edit Movie — CineVerse",
                movie: { ...movie, ...req.body },
                error: error.message
            });
        }
    },

    // POST /admin/movies/delete/:id
    deleteMovie: async (req, res) => {
        try {
            await Promise.all([
                Movie.findByIdAndDelete(req.params.id),
                Review.deleteMany({ movie: req.params.id }),
                Watchlist.deleteMany({ movie: req.params.id })
            ]);
            if (req.xhr || req.headers.accept?.includes("json")) {
                return res.json({ success: true });
            }
            res.redirect("/admin/movies");
        } catch (error) {
            console.error("Delete movie error:", error);
            res.redirect("/admin/movies");
        }
    },

    // GET /admin/users — User management
    usersList: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = 20;
            const skip = (page - 1) * limit;
            const search = req.query.search || "";

            let filter = { role: "user" };
            if (search) {
                filter.$or = [
                    { username: { $regex: search, $options: "i" } },
                    { email: { $regex: search, $options: "i" } }
                ];
            }

            const [users, total] = await Promise.all([
                User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
                User.countDocuments(filter)
            ]);

            // Get review count and watchlist count for each user
            const userIds = users.map(u => u._id);
            const [reviewCounts, watchlistCounts] = await Promise.all([
                Review.aggregate([
                    { $match: { user: { $in: userIds } } },
                    { $group: { _id: "$user", count: { $sum: 1 } } }
                ]),
                Watchlist.aggregate([
                    { $match: { user: { $in: userIds } } },
                    { $group: { _id: "$user", count: { $sum: 1 } } }
                ])
            ]);

            const enrichedUsers = users.map(u => ({
                ...u,
                reviewCount: reviewCounts.find(r => r._id.toString() === u._id.toString())?.count || 0,
                watchlistCount: watchlistCounts.find(w => w._id.toString() === u._id.toString())?.count || 0
            }));

            res.render("admin/users", {
                title: "Manage Users — CineVerse",
                users: enrichedUsers,
                pagination: { page, totalPages: Math.ceil(total / limit), total },
                filters: { search }
            });
        } catch (error) {
            console.error("Users list error:", error);
            res.redirect("/admin");
        }
    },

    // POST /admin/users/toggle/:id — Toggle user active status
    toggleUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (user && user.role !== "admin") {
                user.isActive = !user.isActive;
                await user.save();
            }
            if (req.xhr || req.headers.accept?.includes("json")) {
                return res.json({ success: true, isActive: user.isActive });
            }
            res.redirect("/admin/users");
        } catch (error) {
            res.redirect("/admin/users");
        }
    },

    // GET /admin/reviews — Review moderation
    reviewsList: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = 20;
            const skip = (page - 1) * limit;
            const status = req.query.status || "";

            let filter = {};
            if (status) filter.status = status;

            const [reviews, total] = await Promise.all([
                Review.find(filter)
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limit)
                    .populate("user", "username avatar email")
                    .populate("movie", "title poster slug")
                    .lean(),
                Review.countDocuments(filter)
            ]);

            res.render("admin/reviews", {
                title: "Moderate Reviews — CineVerse",
                reviews,
                pagination: { page, totalPages: Math.ceil(total / limit), total },
                filters: { status }
            });
        } catch (error) {
            console.error("Reviews list error:", error);
            res.redirect("/admin");
        }
    },

    // POST /admin/reviews/status/:id
    updateReviewStatus: async (req, res) => {
        try {
            const { status } = req.body;
            await Review.findByIdAndUpdate(req.params.id, { status });
            if (req.xhr || req.headers.accept?.includes("json")) {
                return res.json({ success: true });
            }
            res.redirect("/admin/reviews");
        } catch (error) {
            res.redirect("/admin/reviews");
        }
    },

    // GET /admin/tmdb/search — TMDB Search
    tmdbSearch: async (req, res) => {
        try {
            const query = req.query.query || "";
            let results = [];

            if (query && envConfig.TMDB_API_KEY) {
                const response = await axios.get(`${envConfig.TMDB_BASE_URL}/search/movie`, {
                    params: {
                        api_key: envConfig.TMDB_API_KEY,
                        query,
                        language: "en-US",
                        page: 1
                    }
                });
                results = response.data.results || [];
            }

            res.json({ results });
        } catch (error) {
            console.error("TMDB search error:", error.message);
            res.json({ results: [], error: "TMDB API error" });
        }
    },

    // POST /admin/tmdb/import/:tmdbId — Import from TMDB
    tmdbImport: async (req, res) => {
        try {
            const { tmdbId } = req.params;

            if (!envConfig.TMDB_API_KEY) {
                return res.status(400).json({ error: "TMDB API key not configured" });
            }

            // Check if already imported
            const existing = await Movie.findOne({ tmdbId: parseInt(tmdbId) });
            if (existing) {
                return res.status(400).json({ error: "Movie already imported", movieId: existing._id });
            }

            // Fetch movie details
            const [movieRes, creditsRes] = await Promise.all([
                axios.get(`${envConfig.TMDB_BASE_URL}/movie/${tmdbId}`, {
                    params: { api_key: envConfig.TMDB_API_KEY, language: "en-US" }
                }),
                axios.get(`${envConfig.TMDB_BASE_URL}/movie/${tmdbId}/credits`, {
                    params: { api_key: envConfig.TMDB_API_KEY }
                })
            ]);

            const tmdbMovie = movieRes.data;
            const credits = creditsRes.data;

            // Map TMDB genres to our genres
            const genreMap = {
                28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy",
                80: "Crime", 99: "Documentary", 18: "Drama", 10751: "Family",
                14: "Fantasy", 36: "History", 27: "Horror", 10402: "Music",
                9648: "Mystery", 10749: "Romance", 878: "Sci-Fi", 53: "Thriller",
                10752: "War", 37: "Western"
            };

            const genres = (tmdbMovie.genres || [])
                .map(g => genreMap[g.id])
                .filter(Boolean);

            // Determine era
            const year = new Date(tmdbMovie.release_date).getFullYear();
            let era = "Contemporary (2010+)";
            if (year < 1970) era = "Classic (Pre-1970)";
            else if (year < 1990) era = "Retro (1970-1990)";
            else if (year < 2010) era = "Modern (1990-2010)";

            // Get director
            const director = credits.crew?.find(c => c.job === "Director")?.name || "Unknown";

            // Get top cast
            const cast = (credits.cast || []).slice(0, 10).map(c => ({
                name: c.name,
                character: c.character
            }));

            const movie = new Movie({
                title: tmdbMovie.title,
                overview: tmdbMovie.overview,
                genres,
                era,
                releaseDate: new Date(tmdbMovie.release_date),
                runtime: tmdbMovie.runtime,
                director,
                cast,
                poster: tmdbMovie.poster_path
                    ? `${envConfig.TMDB_IMAGE_BASE}/w500${tmdbMovie.poster_path}`
                    : "",
                backdrop: tmdbMovie.backdrop_path
                    ? `${envConfig.TMDB_IMAGE_BASE}/original${tmdbMovie.backdrop_path}`
                    : "",
                language: tmdbMovie.original_language?.toUpperCase() || "EN",
                budget: tmdbMovie.budget,
                revenue: tmdbMovie.revenue,
                tmdbId: tmdbMovie.id,
                imdbId: tmdbMovie.imdb_id,
                status: "published",
                addedBy: req.session.user.id
            });

            await movie.save();
            res.json({ success: true, movie });
        } catch (error) {
            console.error("TMDB import error:", error.message);
            res.status(500).json({ error: "Failed to import movie" });
        }
    },

    // GET /admin/analytics — Analytics data (JSON endpoint)
    analyticsData: async (req, res) => {
        try {
            const [
                userGrowth,
                moviesByGenre,
                reviewsByMonth,
                topWatchlisted,
                ratingDistribution
            ] = await Promise.all([
                // Users registered per month (last 6 months)
                User.aggregate([
                    { $match: { role: "user" } },
                    {
                        $group: {
                            _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                            count: { $sum: 1 }
                        }
                    },
                    { $sort: { _id: -1 } },
                    { $limit: 6 }
                ]),
                // Movies by genre
                Movie.aggregate([
                    { $unwind: "$genres" },
                    { $group: { _id: "$genres", count: { $sum: 1 } } },
                    { $sort: { count: -1 } }
                ]),
                // Reviews per month (last 6 months)
                Review.aggregate([
                    {
                        $group: {
                            _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                            count: { $sum: 1 }
                        }
                    },
                    { $sort: { _id: -1 } },
                    { $limit: 6 }
                ]),
                // Most watchlisted movies
                Watchlist.aggregate([
                    { $group: { _id: "$movie", count: { $sum: 1 } } },
                    { $sort: { count: -1 } },
                    { $limit: 10 },
                    {
                        $lookup: {
                            from: "movies",
                            localField: "_id",
                            foreignField: "_id",
                            as: "movie"
                        }
                    },
                    { $unwind: "$movie" },
                    { $project: { title: "$movie.title", count: 1 } }
                ]),
                // Overall rating distribution
                Review.aggregate([
                    {
                        $group: {
                            _id: { $round: ["$ratings.overall", 0] },
                            count: { $sum: 1 }
                        }
                    },
                    { $sort: { _id: 1 } }
                ])
            ]);

            res.json({
                userGrowth: userGrowth.reverse(),
                moviesByGenre,
                reviewsByMonth: reviewsByMonth.reverse(),
                topWatchlisted,
                ratingDistribution
            });
        } catch (error) {
            console.error("Analytics error:", error);
            res.json({ error: "Failed to load analytics" });
        }
    }
};

export default adminController;
