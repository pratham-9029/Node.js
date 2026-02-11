import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routers/index.js";
import db from "./configs/database.js";
import { envConfig } from "./configs/dotenv.js";
import { setUserLocals } from "./middleware/auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = envConfig.PORT || 3000;

// Connect to database
await db();

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Session
app.use(session({
    secret: envConfig.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: envConfig.MONGODB_URL,
        ttl: 24 * 60 * 60 // 1 day
    }),
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true,
        secure: false
    }
}));

// Set user in all views
app.use(setUserLocals);

// Static files
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use(router);

// 404 Handler
app.use((req, res) => {
    res.status(404).render("user/404", { title: "Page Not Found — CineVerse" });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error("Server Error:", err.stack || err.message || err);
    try {
        res.status(500).render("user/404", { title: "Server Error — CineVerse" });
    } catch (renderErr) {
        res.status(500).send("Internal Server Error: " + err.message);
    }
});

app.listen(PORT, () => {
    console.log(`🎬 CineVerse is running on http://localhost:${PORT}`);
});
