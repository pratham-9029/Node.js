import Watchlist from "../models/Watchlist.js";
import Movie from "../models/Movie.js";

const watchlistController = {
    // GET /watchlist — User's watchlist page
    watchlistPage: async (req, res) => {
        try {
            const status = req.query.status || "";
            let filter = { user: req.session.user.id };
            if (status) filter.status = status;

            const watchlist = await Watchlist.find(filter)
                .sort({ createdAt: -1 })
                .populate("movie", "title poster slug genres era runtime ratings releaseDate director")
                .lean();

            // Get status counts
            const statusCounts = await Watchlist.aggregate([
                { $match: { user: req.session.user.id } },
                { $group: { _id: "$status", count: { $sum: 1 } } }
            ]);

            const counts = {
                all: statusCounts.reduce((sum, s) => sum + s.count, 0),
                plan_to_watch: 0,
                watching: 0,
                completed: 0,
                dropped: 0,
                on_hold: 0
            };
            statusCounts.forEach(s => { counts[s._id] = s.count; });

            res.render("user/watchlist", {
                title: "My Watchlist — CineVerse",
                watchlist,
                counts,
                currentStatus: status
            });
        } catch (error) {
            console.error("Watchlist error:", error);
            res.render("user/watchlist", {
                title: "My Watchlist — CineVerse",
                watchlist: [],
                counts: { all: 0, plan_to_watch: 0, watching: 0, completed: 0, dropped: 0, on_hold: 0 },
                currentStatus: ""
            });
        }
    },

    // POST /watchlist/add — Add movie to watchlist
    addToWatchlist: async (req, res) => {
        try {
            const { movieId, status, priority, notes } = req.body;

            const movie = await Movie.findById(movieId);
            if (!movie) return res.status(404).json({ error: "Movie not found" });

            const entry = await Watchlist.findOneAndUpdate(
                { user: req.session.user.id, movie: movieId },
                {
                    user: req.session.user.id,
                    movie: movieId,
                    status: status || "plan_to_watch",
                    priority: priority || "medium",
                    notes: notes || ""
                },
                { upsert: true, new: true }
            );

            res.json({ success: true, entry });
        } catch (error) {
            console.error("Add to watchlist error:", error);
            res.status(500).json({ error: "Failed to add to watchlist" });
        }
    },

    // PUT /watchlist/update/:id — Update watchlist entry
    updateWatchlistEntry: async (req, res) => {
        try {
            const { status, priority, notes } = req.body;
            const update = {};
            if (status) {
                update.status = status;
                if (status === "completed") update.completedAt = new Date();
            }
            if (priority) update.priority = priority;
            if (notes !== undefined) update.notes = notes;

            const entry = await Watchlist.findOneAndUpdate(
                { _id: req.params.id, user: req.session.user.id },
                update,
                { new: true }
            );

            if (!entry) return res.status(404).json({ error: "Entry not found" });
            res.json({ success: true, entry });
        } catch (error) {
            res.status(500).json({ error: "Failed to update watchlist" });
        }
    },

    // DELETE /watchlist/remove/:id — Remove from watchlist
    removeFromWatchlist: async (req, res) => {
        try {
            await Watchlist.findOneAndDelete({
                _id: req.params.id,
                user: req.session.user.id
            });
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ error: "Failed to remove from watchlist" });
        }
    },

    // GET /profile — User profile page
    profilePage: async (req, res) => {
        try {
            const user = await Watchlist.aggregate([
                { $match: { user: req.session.user.id } },
                { $group: { _id: "$status", count: { $sum: 1 } } }
            ]);

            res.render("user/profile", {
                title: "My Profile — CineVerse",
                statusData: user
            });
        } catch (error) {
            res.render("user/profile", {
                title: "My Profile — CineVerse",
                statusData: []
            });
        }
    }
};

export default watchlistController;
