import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    ratings: {
        direction: { type: Number, required: true, min: 1, max: 5 },
        acting: { type: Number, required: true, min: 1, max: 5 },
        visuals: { type: Number, required: true, min: 1, max: 5 },
        story: { type: Number, required: true, min: 1, max: 5 },
        overall: { type: Number, required: true, min: 1, max: 5 }
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 150
    },
    content: {
        type: String,
        required: true,
        maxlength: 3000
    },
    spoiler: {
        type: Boolean,
        default: false
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    status: {
        type: String,
        enum: ["approved", "pending", "rejected"],
        default: "approved"
    }
}, { timestamps: true });

// One review per user per movie
reviewSchema.index({ movie: 1, user: 1 }, { unique: true });

const Review = mongoose.model("Review", reviewSchema);
export default Review;
