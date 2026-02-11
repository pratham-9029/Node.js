import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true
    },
    overview: {
        type: String,
        required: true
    },
    genres: [{
        type: String,
        enum: [
            "Action", "Adventure", "Animation", "Comedy", "Crime",
            "Documentary", "Drama", "Family", "Fantasy", "History",
            "Horror", "Music", "Mystery", "Romance", "Sci-Fi",
            "Thriller", "War", "Western"
        ]
    }],
    mood: [{
        type: String,
        enum: [
            "Feel-Good", "Intense", "Thought-Provoking", "Dark",
            "Romantic", "Adventurous", "Suspenseful", "Heartwarming",
            "Mind-Bending", "Nostalgic", "Inspirational", "Eerie"
        ]
    }],
    era: {
        type: String,
        enum: ["Classic (Pre-1970)", "Retro (1970-1990)", "Modern (1990-2010)", "Contemporary (2010+)"],
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    runtime: {
        type: Number, // in minutes
        min: 1
    },
    director: {
        type: String,
        required: true,
        trim: true
    },
    cast: [{
        name: String,
        character: String
    }],
    poster: {
        type: String,
        default: ""
    },
    backdrop: {
        type: String,
        default: ""
    },
    trailer: {
        type: String,
        default: ""
    },
    language: {
        type: String,
        default: "English"
    },
    budget: Number,
    revenue: Number,
    tmdbId: {
        type: Number,
        unique: true,
        sparse: true
    },
    imdbId: {
        type: String,
        sparse: true
    },
    ratings: {
        direction: { type: Number, default: 0, min: 0, max: 5 },
        acting: { type: Number, default: 0, min: 0, max: 5 },
        visuals: { type: Number, default: 0, min: 0, max: 5 },
        story: { type: Number, default: 0, min: 0, max: 5 },
        overall: { type: Number, default: 0, min: 0, max: 5 },
        count: { type: Number, default: 0 }
    },
    status: {
        type: String,
        enum: ["published", "draft", "archived"],
        default: "published"
    },
    featured: {
        type: Boolean,
        default: false
    },
    viewCount: {
        type: Number,
        default: 0
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

// Generate slug before saving
movieSchema.pre("save", function () {
    if (this.isModified("title")) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
    }
});

// Text index for search — use language_override to avoid conflict with movie's language field
movieSchema.index({ title: "text", overview: "text", director: "text" }, { language_override: "searchLang" });

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;
