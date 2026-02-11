import Movie from "../models/Movie.js";
import Review from "../models/Review.js";
import Watchlist from "../models/Watchlist.js";
import User from "../models/User.js";

const movieController = {
    // GET / — Home page with featured movies, trending, etc.
    homePage: async (req, res) => {
        try {
            const [featuredMovies, latestMovies, topRated, genreCounts] = await Promise.all([
                Movie.find({ status: "published", featured: true }).limit(6).lean(),
                Movie.find({ status: "published" }).sort({ createdAt: -1 }).limit(12).lean(),
                Movie.find({ status: "published", "ratings.count": { $gt: 0 } })
                    .sort({ "ratings.overall": -1 }).limit(8).lean(),
                Movie.aggregate([
                    { $match: { status: "published" } },
                    { $unwind: "$genres" },
                    { $group: { _id: "$genres", count: { $sum: 1 } } },
                    { $sort: { count: -1 } }
                ])
            ]);

            res.render("user/home", {
                title: "CineVerse — Discover Your Next Favorite Movie",
                featuredMovies,
                latestMovies,
                topRated,
                genreCounts
            });
        } catch (error) {
            console.error("Home page error:", error);
            res.render("user/home", {
                title: "CineVerse — Discover Your Next Favorite Movie",
                featuredMovies: [],
                latestMovies: [],
                topRated: [],
                genreCounts: []
            });
        }
    },

    // GET /discover — Discovery engine with filtering
    discover: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = 16;
            const skip = (page - 1) * limit;

            const { genre, era, mood, sort, search } = req.query;

            let filter = { status: "published" };
            if (genre) filter.genres = genre;
            if (era) filter.era = era;
            if (mood) filter.mood = mood;
            if (search) {
                filter.$or = [
                    { title: { $regex: search, $options: "i" } },
                    { director: { $regex: search, $options: "i" } },
                    { overview: { $regex: search, $options: "i" } }
                ];
            }

            let sortBy = { createdAt: -1 };
            if (sort === "rating") sortBy = { "ratings.overall": -1 };
            else if (sort === "title") sortBy = { title: 1 };
            else if (sort === "release") sortBy = { releaseDate: -1 };
            else if (sort === "popular") sortBy = { viewCount: -1 };

            const [movies, total] = await Promise.all([
                Movie.find(filter).sort(sortBy).skip(skip).limit(limit).lean(),
                Movie.countDocuments(filter)
            ]);

            if (req.xhr || req.headers.accept?.includes("json")) {
                return res.json({
                    movies,
                    pagination: { page, totalPages: Math.ceil(total / limit), total }
                });
            }

            res.render("user/discover", {
                title: "Discover Movies — CineVerse",
                movies,
                pagination: { page, totalPages: Math.ceil(total / limit), total },
                filters: { genre, era, mood, sort, search }
            });
        } catch (error) {
            console.error("Discover error:", error);
            res.status(500).json({ error: error.message, stack: error.stack });
        }
    },

    // GET /movie/:slug — Movie detail page
    movieDetail: async (req, res) => {
        try {
            const movie = await Movie.findOne({ slug: req.params.slug, status: "published" });
            if (!movie) {
                return res.status(404).render("user/404", { title: "Movie Not Found — CineVerse" });
            }

            // Increment view count
            movie.viewCount += 1;
            await movie.save();

            const reviews = await Review.find({ movie: movie._id, status: "approved" })
                .sort({ createdAt: -1 })
                .limit(10)
                .populate("user", "username avatar")
                .lean();

            // Check if user has this in watchlist, and if they've reviewed it
            let watchlistEntry = null;
            let userReview = null;
            if (req.session?.user) {
                [watchlistEntry, userReview] = await Promise.all([
                    Watchlist.findOne({ user: req.session.user.id, movie: movie._id }).lean(),
                    Review.findOne({ user: req.session.user.id, movie: movie._id }).lean()
                ]);
            }

            // Similar movies
            const similarMovies = await Movie.find({
                _id: { $ne: movie._id },
                status: "published",
                genres: { $in: movie.genres }
            }).limit(6).lean();

            res.render("user/movie-detail", {
                title: `${movie.title} — CineVerse`,
                movie: movie.toObject(),
                reviews,
                watchlistEntry,
                userReview,
                similarMovies
            });
        } catch (error) {
            console.error("Movie detail error:", error);
            res.status(500).render("user/404", { title: "Error — CineVerse" });
        }
    },

    // POST /movie/:id/review — Submit a review
    submitReview: async (req, res) => {
        try {
            const movie = await Movie.findById(req.params.id);
            if (!movie) return res.status(404).json({ error: "Movie not found" });

            const { title, content, spoiler, direction, acting, visuals, story, overall } = req.body;

            const review = new Review({
                movie: movie._id,
                user: req.session.user.id,
                title,
                content,
                spoiler: spoiler === "on" || spoiler === true,
                ratings: {
                    direction: parseInt(direction),
                    acting: parseInt(acting),
                    visuals: parseInt(visuals),
                    story: parseInt(story),
                    overall: parseInt(overall)
                }
            });

            await review.save();

            // Update movie aggregate ratings
            const allReviews = await Review.find({ movie: movie._id, status: "approved" });
            const count = allReviews.length;
            if (count > 0) {
                const avg = (field) => allReviews.reduce((sum, r) => sum + r.ratings[field], 0) / count;
                movie.ratings = {
                    direction: Math.round(avg("direction") * 10) / 10,
                    acting: Math.round(avg("acting") * 10) / 10,
                    visuals: Math.round(avg("visuals") * 10) / 10,
                    story: Math.round(avg("story") * 10) / 10,
                    overall: Math.round(avg("overall") * 10) / 10,
                    count
                };
                await movie.save();
            }

            if (req.xhr || req.headers.accept?.includes("json")) {
                return res.json({ success: true, review });
            }
            res.redirect(`/movie/${movie.slug}`);
        } catch (error) {
            if (error.code === 11000) {
                return res.status(400).json({ error: "You've already reviewed this movie" });
            }
            console.error("Submit review error:", error);
            res.status(500).json({ error: "Failed to submit review" });
        }
    },

    // POST /review/:id/like — Toggle like on a review
    toggleLike: async (req, res) => {
        try {
            const review = await Review.findById(req.params.id);
            if (!review) return res.status(404).json({ error: "Review not found" });

            const userId = req.session.user.id;
            const likeIndex = review.likes.indexOf(userId);

            if (likeIndex > -1) {
                review.likes.splice(likeIndex, 1);
            } else {
                review.likes.push(userId);
            }

            await review.save();
            res.json({ success: true, likes: review.likes.length, liked: likeIndex === -1 });
        } catch (error) {
            res.status(500).json({ error: "Failed to toggle like" });
        }
    }
};

export default movieController;
