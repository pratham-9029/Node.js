import dotenv from "dotenv";
dotenv.config();

export const envConfig = {
    PORT: process.env.PORT || 3000,
    MONGODB_URL: process.env.MONGODB_URL || "mongodb://localhost:27017/movie_ecosystem",
    JWT_SECRET: process.env.JWT_SECRET || "movie_ecosystem_secret_key_2026",
    SESSION_SECRET: process.env.SESSION_SECRET || "session_secret_movie_2026",
    TMDB_API_KEY: process.env.TMDB_API_KEY || "",
    TMDB_BASE_URL: "https://api.themoviedb.org/3",
    TMDB_IMAGE_BASE: "https://image.tmdb.org/t/p"
}
