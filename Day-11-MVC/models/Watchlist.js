import mongoose from "mongoose";

const watchlistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true
    },
    status: {
        type: String,
        enum: ["plan_to_watch", "watching", "completed", "dropped", "on_hold"],
        default: "plan_to_watch"
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium"
    },
    notes: {
        type: String,
        maxlength: 500,
        default: ""
    },
    addedAt: {
        type: Date,
        default: Date.now
    },
    completedAt: {
        type: Date
    }
}, { timestamps: true });

watchlistSchema.index({ user: 1, movie: 1 }, { unique: true });

const Watchlist = mongoose.model("Watchlist", watchlistSchema);
export default Watchlist;
