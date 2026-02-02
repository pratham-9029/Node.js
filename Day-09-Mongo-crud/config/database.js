import mongoose from "mongoose"
import { env } from "./dotenv.js"

mongoose.connect(env.MONGO_URL)
const db = mongoose.connection;

db.on('connected', (err) => {
    if (err) {
        console.error('MongoDB connection error:', err);
    } else {
        console.log('MongoDB connected');
    }
});

export default db;