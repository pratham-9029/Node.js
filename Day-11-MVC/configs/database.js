import mongoose from "mongoose";
import { envConfig } from "./dotenv.js";

const db = async () => {
    try {
        await mongoose.connect(envConfig.MONGODB_URL);
        console.log("✅ MongoDB connected successfully");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error.message);
        process.exit(1);
    }
}

export default db;