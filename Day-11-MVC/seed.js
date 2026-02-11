import mongoose from "mongoose";
import { envConfig } from "./configs/dotenv.js";
import User from "./models/User.js";
import Movie from "./models/Movie.js";
import Review from "./models/Review.js";
import Watchlist from "./models/Watchlist.js";

const seedDatabase = async () => {
    try {
        await mongoose.connect(envConfig.MONGODB_URL);
        console.log("✅ Connected to MongoDB");

        // Clear existing data
        await Promise.all([
            User.deleteMany({}),
            Movie.deleteMany({}),
            Review.deleteMany({}),
            Watchlist.deleteMany({})
        ]);
        console.log("🗑️  Cleared existing data");

        // Create admin user
        const admin = await User.create({
            username: "admin",
            email: "admin@cineverse.com",
            password: "admin123",
            role: "admin"
        });

        // Create sample users
        const users = await User.create([
            { username: "cinephile_alex", email: "alex@example.com", password: "password123", favoriteGenres: ["Sci-Fi", "Thriller", "Drama"] },
            { username: "movie_buff_sam", email: "sam@example.com", password: "password123", favoriteGenres: ["Action", "Adventure", "Comedy"] },
            { username: "film_noir_jane", email: "jane@example.com", password: "password123", favoriteGenres: ["Mystery", "Crime", "Drama"] },
            { username: "horror_hunter", email: "hunter@example.com", password: "password123", favoriteGenres: ["Horror", "Thriller", "Mystery"] },
            { username: "rom_com_lover", email: "lover@example.com", password: "password123", favoriteGenres: ["Romance", "Comedy", "Drama"] }
        ]);
        console.log("👥 Created users");

        // Create movies
        const movies = await Movie.create([
            {
                title: "Blade Runner 2049",
                overview: "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who's been missing for thirty years. A visually stunning neo-noir science fiction masterpiece.",
                genres: ["Sci-Fi", "Drama", "Thriller"],
                mood: ["Thought-Provoking", "Dark", "Mind-Bending"],
                era: "Contemporary (2010+)",
                releaseDate: new Date("2017-10-06"),
                runtime: 164,
                director: "Denis Villeneuve",
                cast: [
                    { name: "Ryan Gosling", character: "K" },
                    { name: "Harrison Ford", character: "Rick Deckard" },
                    { name: "Ana de Armas", character: "Joi" }
                ],
                poster: "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
                backdrop: "https://image.tmdb.org/t/p/original/sAtoMqDVhNDQBc3QJL3RF6hlhGq.jpg",
                language: "English",
                status: "published",
                featured: true,
                addedBy: admin._id
            },
            {
                title: "Inception",
                overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team.",
                genres: ["Sci-Fi", "Action", "Thriller"],
                mood: ["Mind-Bending", "Intense", "Suspenseful"],
                era: "Contemporary (2010+)",
                releaseDate: new Date("2010-07-16"),
                runtime: 148,
                director: "Christopher Nolan",
                cast: [
                    { name: "Leonardo DiCaprio", character: "Dom Cobb" },
                    { name: "Joseph Gordon-Levitt", character: "Arthur" },
                    { name: "Elliot Page", character: "Ariadne" }
                ],
                poster: "https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
                backdrop: "https://image.tmdb.org/t/p/original/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
                language: "English",
                status: "published",
                featured: true,
                addedBy: admin._id
            },
            {
                title: "Parasite",
                overview: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan. A genre-defying thriller that masterfully blends dark comedy with biting social commentary.",
                genres: ["Drama", "Thriller", "Comedy"],
                mood: ["Dark", "Thought-Provoking", "Intense"],
                era: "Contemporary (2010+)",
                releaseDate: new Date("2019-05-30"),
                runtime: 132,
                director: "Bong Joon-ho",
                cast: [
                    { name: "Song Kang-ho", character: "Ki-taek" },
                    { name: "Lee Sun-kyun", character: "Dong-ik" },
                    { name: "Cho Yeo-jeong", character: "Yeon-gyo" }
                ],
                poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
                backdrop: "https://image.tmdb.org/t/p/original/TU9Bx8OanmMIWIGOackMTQz9uz3.jpg",
                language: "Korean",
                status: "published",
                featured: true,
                addedBy: admin._id
            },
            {
                title: "The Shawshank Redemption",
                overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency. A timeless tale of hope and the indomitable human spirit.",
                genres: ["Drama"],
                mood: ["Inspirational", "Thought-Provoking", "Heartwarming"],
                era: "Modern (1990-2010)",
                releaseDate: new Date("1994-09-23"),
                runtime: 142,
                director: "Frank Darabont",
                cast: [
                    { name: "Tim Robbins", character: "Andy Dufresne" },
                    { name: "Morgan Freeman", character: "Red" }
                ],
                poster: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
                backdrop: "https://image.tmdb.org/t/p/original/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
                language: "English",
                status: "published",
                featured: true,
                addedBy: admin._id
            },
            {
                title: "Interstellar",
                overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival. An epic journey through space and time that explores love, sacrifice, and the human condition.",
                genres: ["Sci-Fi", "Adventure", "Drama"],
                mood: ["Mind-Bending", "Intense", "Inspirational"],
                era: "Contemporary (2010+)",
                releaseDate: new Date("2014-11-07"),
                runtime: 169,
                director: "Christopher Nolan",
                cast: [
                    { name: "Matthew McConaughey", character: "Cooper" },
                    { name: "Anne Hathaway", character: "Brand" },
                    { name: "Jessica Chastain", character: "Murph" }
                ],
                poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
                backdrop: "https://image.tmdb.org/t/p/original/xu9zaAevzQ5nnrsXN6JcahLnG4i.jpg",
                language: "English",
                status: "published",
                featured: true,
                addedBy: admin._id
            },
            {
                title: "Pulp Fiction",
                overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption. Tarantino's postmodern masterpiece redefined cinema storytelling.",
                genres: ["Crime", "Drama", "Thriller"],
                mood: ["Dark", "Intense", "Thought-Provoking"],
                era: "Modern (1990-2010)",
                releaseDate: new Date("1994-10-14"),
                runtime: 154,
                director: "Quentin Tarantino",
                cast: [
                    { name: "John Travolta", character: "Vincent Vega" },
                    { name: "Uma Thurman", character: "Mia Wallace" },
                    { name: "Samuel L. Jackson", character: "Jules Winnfield" }
                ],
                poster: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
                backdrop: "https://image.tmdb.org/t/p/original/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg",
                language: "English",
                status: "published",
                featured: false,
                addedBy: admin._id
            },
            {
                title: "The Grand Budapest Hotel",
                overview: "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel's glorious years under a legendary concierge. A whimsical visual feast.",
                genres: ["Comedy", "Adventure", "Drama"],
                mood: ["Feel-Good", "Nostalgic", "Adventurous"],
                era: "Contemporary (2010+)",
                releaseDate: new Date("2014-03-28"),
                runtime: 99,
                director: "Wes Anderson",
                cast: [
                    { name: "Ralph Fiennes", character: "M. Gustave" },
                    { name: "Tony Revolori", character: "Zero" },
                    { name: "Saoirse Ronan", character: "Agatha" }
                ],
                poster: "https://image.tmdb.org/t/p/w500/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg",
                backdrop: "https://image.tmdb.org/t/p/original/g3hBRfo33tGo6m4qkPkmRAIJWtG.jpg",
                language: "English",
                status: "published",
                featured: false,
                addedBy: admin._id
            },
            {
                title: "Get Out",
                overview: "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point. A groundbreaking social horror.",
                genres: ["Horror", "Thriller", "Mystery"],
                mood: ["Suspenseful", "Dark", "Thought-Provoking"],
                era: "Contemporary (2010+)",
                releaseDate: new Date("2017-02-24"),
                runtime: 104,
                director: "Jordan Peele",
                cast: [
                    { name: "Daniel Kaluuya", character: "Chris Washington" },
                    { name: "Allison Williams", character: "Rose Armitage" }
                ],
                poster: "https://image.tmdb.org/t/p/w500/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg",
                backdrop: "https://image.tmdb.org/t/p/original/wPXmgcJyYjS29prIkhYpNMqrFCk.jpg",
                language: "English",
                status: "published",
                featured: false,
                addedBy: admin._id
            },
            {
                title: "La La Land",
                overview: "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future. A breathtaking modern musical.",
                genres: ["Romance", "Drama", "Music"],
                mood: ["Romantic", "Nostalgic", "Heartwarming"],
                era: "Contemporary (2010+)",
                releaseDate: new Date("2016-12-09"),
                runtime: 128,
                director: "Damien Chazelle",
                cast: [
                    { name: "Ryan Gosling", character: "Sebastian" },
                    { name: "Emma Stone", character: "Mia" }
                ],
                poster: "https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
                backdrop: "https://image.tmdb.org/t/p/original/nadTlnTE6DjKPOGMhYAeyOFbL3v.jpg",
                language: "English",
                status: "published",
                featured: true,
                addedBy: admin._id
            },
            {
                title: "Mad Max: Fury Road",
                overview: "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search of her homeland with the aid of a group of female prisoners and a lone drifter. Pure adrenaline cinema at its finest.",
                genres: ["Action", "Adventure", "Sci-Fi"],
                mood: ["Intense", "Adventurous", "Dark"],
                era: "Contemporary (2010+)",
                releaseDate: new Date("2015-05-15"),
                runtime: 120,
                director: "George Miller",
                cast: [
                    { name: "Tom Hardy", character: "Max Rockatansky" },
                    { name: "Charlize Theron", character: "Imperator Furiosa" }
                ],
                poster: "https://image.tmdb.org/t/p/w500/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg",
                backdrop: "https://image.tmdb.org/t/p/original/nlCHUWjY9XWbuEUQauCBgnY8wkg.jpg",
                language: "English",
                status: "published",
                featured: false,
                addedBy: admin._id
            },
            {
                title: "The Godfather",
                overview: "The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son. The definitive gangster saga.",
                genres: ["Crime", "Drama"],
                mood: ["Dark", "Intense", "Thought-Provoking"],
                era: "Retro (1970-1990)",
                releaseDate: new Date("1972-03-24"),
                runtime: 175,
                director: "Francis Ford Coppola",
                cast: [
                    { name: "Marlon Brando", character: "Don Vito Corleone" },
                    { name: "Al Pacino", character: "Michael Corleone" }
                ],
                poster: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
                backdrop: "https://image.tmdb.org/t/p/original/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
                language: "English",
                status: "published",
                featured: false,
                addedBy: admin._id
            },
            {
                title: "Spirited Away",
                overview: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts. Miyazaki's enchanting masterpiece.",
                genres: ["Animation", "Fantasy", "Adventure"],
                mood: ["Adventurous", "Mind-Bending", "Heartwarming"],
                era: "Modern (1990-2010)",
                releaseDate: new Date("2001-07-20"),
                runtime: 125,
                director: "Hayao Miyazaki",
                cast: [
                    { name: "Rumi Hiiragi", character: "Chihiro (voice)" },
                    { name: "Miyu Irino", character: "Haku (voice)" }
                ],
                poster: "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
                backdrop: "https://image.tmdb.org/t/p/original/Ab8mkHmkYADjU7wQiOkia9BzGvS.jpg",
                language: "Japanese",
                status: "published",
                featured: false,
                addedBy: admin._id
            },
            {
                title: "Dune: Part Two",
                overview: "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family. An epic continuation of the most ambitious sci-fi saga of our generation.",
                genres: ["Sci-Fi", "Adventure", "Drama"],
                mood: ["Intense", "Adventurous", "Mind-Bending"],
                era: "Contemporary (2010+)",
                releaseDate: new Date("2024-03-01"),
                runtime: 166,
                director: "Denis Villeneuve",
                cast: [
                    { name: "Timothée Chalamet", character: "Paul Atreides" },
                    { name: "Zendaya", character: "Chani" },
                    { name: "Austin Butler", character: "Feyd-Rautha" }
                ],
                poster: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nez7S.jpg",
                backdrop: "https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
                language: "English",
                status: "published",
                featured: true,
                addedBy: admin._id
            },
            {
                title: "Everything Everywhere All at Once",
                overview: "An aging Chinese immigrant is swept up in an insane adventure where she alone can save the world by exploring other universes connecting with the lives she could have led. A multiverse of emotion and action.",
                genres: ["Action", "Adventure", "Comedy"],
                mood: ["Mind-Bending", "Heartwarming", "Feel-Good"],
                era: "Contemporary (2010+)",
                releaseDate: new Date("2022-03-25"),
                runtime: 139,
                director: "Daniel Kwan, Daniel Scheinert",
                cast: [
                    { name: "Michelle Yeoh", character: "Evelyn Quan Wang" },
                    { name: "Ke Huy Quan", character: "Waymond Wang" },
                    { name: "Stephanie Hsu", character: "Joy Wang" }
                ],
                poster: "https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
                backdrop: "https://image.tmdb.org/t/p/original/fOy2Jurz9k6RnJnMUMRDAgBwru2.jpg",
                language: "English",
                status: "published",
                featured: false,
                addedBy: admin._id
            },
            {
                title: "The Dark Knight",
                overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
                genres: ["Action", "Crime", "Drama"],
                mood: ["Dark", "Intense", "Thought-Provoking"],
                era: "Modern (1990-2010)",
                releaseDate: new Date("2008-07-18"),
                runtime: 152,
                director: "Christopher Nolan",
                cast: [
                    { name: "Christian Bale", character: "Bruce Wayne / Batman" },
                    { name: "Heath Ledger", character: "The Joker" },
                    { name: "Aaron Eckhart", character: "Harvey Dent" }
                ],
                poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911BTUgMe1nIBIx.jpg",
                backdrop: "https://image.tmdb.org/t/p/original/nMKdUUepR0i5zn0y1T4CsSB5ez1.jpg",
                language: "English",
                status: "published",
                featured: false,
                addedBy: admin._id
            },
            {
                title: "Whiplash",
                overview: "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.",
                genres: ["Drama", "Music"],
                mood: ["Intense", "Inspirational", "Dark"],
                era: "Contemporary (2010+)",
                releaseDate: new Date("2014-10-10"),
                runtime: 106,
                director: "Damien Chazelle",
                cast: [
                    { name: "Miles Teller", character: "Andrew Neiman" },
                    { name: "J.K. Simmons", character: "Terence Fletcher" }
                ],
                poster: "https://image.tmdb.org/t/p/w500/oPxnRhyAIzJKEUzRCZbBKSVNlKb.jpg",
                backdrop: "https://image.tmdb.org/t/p/original/6bbZ6XlDd2do3BIlPfqz6bUPek1.jpg",
                language: "English",
                status: "published",
                featured: false,
                addedBy: admin._id
            }
        ]);
        console.log(`🎬 Created ${movies.length} movies`);

        // Create some reviews
        const reviewsData = [
            { movie: movies[0]._id, user: users[0]._id, title: "A Visual Masterpiece", content: "Blade Runner 2049 is a triumph of visual storytelling. Denis Villeneuve crafted a world that feels both alien and hauntingly familiar. Roger Deakins' cinematography is nothing short of breathtaking, and the score by Hans Zimmer and Benjamin Wallfisch perfectly complements the dystopian atmosphere.", ratings: { direction: 5, acting: 5, visuals: 5, story: 4, overall: 5 } },
            { movie: movies[0]._id, user: users[1]._id, title: "Slow But Rewarding", content: "This movie takes its time, which might put off some viewers, but for those who stay with it, the payoff is immense. Ryan Gosling delivers a nuanced performance, and the themes about what it means to be human are deeply resonant.", ratings: { direction: 5, acting: 4, visuals: 5, story: 4, overall: 4 } },
            { movie: movies[1]._id, user: users[0]._id, title: "Mind-Bending Brilliance", content: "Nolan at his finest. The concept of dream-within-a-dream is executed flawlessly. The rotating hallway fight scene alone is worth the price of admission. DiCaprio brings emotional depth to what could have been a purely cerebral exercise.", ratings: { direction: 5, acting: 5, visuals: 5, story: 5, overall: 5 } },
            { movie: movies[1]._id, user: users[2]._id, title: "Complex and Captivating", content: "Inception demands your full attention and rewards you for it. The layers of reality are meticulously constructed, and each viewing reveals new details. Hans Zimmer's score is iconic and the ensemble cast is superb.", ratings: { direction: 5, acting: 4, visuals: 5, story: 5, overall: 5 } },
            { movie: movies[2]._id, user: users[1]._id, title: "Deserved Every Oscar", content: "Parasite is a social commentary disguised as a thriller disguised as a comedy. Bong Joon-ho's direction is razor-sharp, and the way the film shifts tone is masterfully controlled. The basement reveal scene is one of the best in cinema history.", ratings: { direction: 5, acting: 5, visuals: 4, story: 5, overall: 5 } },
            { movie: movies[3]._id, user: users[3]._id, title: "Timeless Classic", content: "The Shawshank Redemption is the kind of movie that gets better with every viewing. The friendship between Andy and Red is one of cinema's greatest. Morgan Freeman's narration is perfect, and the ending is one of the most satisfying in film history.", ratings: { direction: 5, acting: 5, visuals: 4, story: 5, overall: 5 } },
            { movie: movies[4]._id, user: users[0]._id, title: "Space Epic That Moved Me to Tears", content: "Interstellar is not just a space movie — it's a love story told across dimensions. The docking scene, the tesseract, and the time dilation on Miller's planet are unforgettable. Hans Zimmer's organ-driven score is transcendent.", ratings: { direction: 5, acting: 5, visuals: 5, story: 5, overall: 5 } },
            { movie: movies[8]._id, user: users[4]._id, title: "A Love Letter to Dreamers", content: "La La Land captures the bittersweet nature of pursuing your dreams while trying to hold onto love. The opening sequence on the highway is exhilarating, and the planetarium scene is pure magic. Gosling and Stone have incredible chemistry.", ratings: { direction: 5, acting: 5, visuals: 5, story: 4, overall: 5 } },
            { movie: movies[9]._id, user: users[1]._id, title: "Pure Adrenaline", content: "Mad Max: Fury Road is the greatest action movie ever made. Full stop. The practical effects, the relentless pacing, and Charlize Theron's Furiosa make this an instant classic. George Miller proved that action cinema can be art.", ratings: { direction: 5, acting: 4, visuals: 5, story: 4, overall: 5 } },
            { movie: movies[12]._id, user: users[0]._id, title: "The Definitive Sci-Fi Epic", content: "Dune: Part Two exceeded all expectations. Villeneuve took Herbert's dense source material and created something visceral and operatic. Austin Butler's Feyd-Rautha is terrifying, and the sandworm riding sequence is jaw-dropping.", ratings: { direction: 5, acting: 5, visuals: 5, story: 5, overall: 5 } }
        ];

        const reviews = await Review.create(reviewsData);
        console.log(`📝 Created ${reviews.length} reviews`);

        // Update movie ratings based on reviews
        for (const movie of movies) {
            const movieReviews = reviews.filter(r => r.movie.toString() === movie._id.toString());
            if (movieReviews.length > 0) {
                const count = movieReviews.length;
                const avg = (field) => movieReviews.reduce((sum, r) => sum + r.ratings[field], 0) / count;
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
        }
        console.log("⭐ Updated movie ratings");

        // Create watchlist entries
        const watchlistEntries = [
            { user: users[0]._id, movie: movies[6]._id, status: "plan_to_watch", priority: "high" },
            { user: users[0]._id, movie: movies[7]._id, status: "plan_to_watch", priority: "medium" },
            { user: users[0]._id, movie: movies[0]._id, status: "completed", priority: "high" },
            { user: users[0]._id, movie: movies[1]._id, status: "completed", priority: "high" },
            { user: users[1]._id, movie: movies[3]._id, status: "completed", priority: "high" },
            { user: users[1]._id, movie: movies[4]._id, status: "watching", priority: "high" },
            { user: users[1]._id, movie: movies[10]._id, status: "plan_to_watch", priority: "medium" },
            { user: users[2]._id, movie: movies[5]._id, status: "completed", priority: "high" },
            { user: users[2]._id, movie: movies[7]._id, status: "plan_to_watch", priority: "low" },
            { user: users[3]._id, movie: movies[7]._id, status: "completed", priority: "high" },
            { user: users[3]._id, movie: movies[2]._id, status: "watching", priority: "medium" },
            { user: users[4]._id, movie: movies[8]._id, status: "completed", priority: "high" },
            { user: users[4]._id, movie: movies[6]._id, status: "plan_to_watch", priority: "medium" }
        ];

        await Watchlist.create(watchlistEntries);
        console.log("📋 Created watchlist entries");

        console.log("\n🎉 Database seeded successfully!");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("  Admin Login:");
        console.log("  Email: admin@cineverse.com");
        console.log("  Password: admin123");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("  User Login:");
        console.log("  Email: alex@example.com");
        console.log("  Password: password123");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

        process.exit(0);
    } catch (error) {
        console.error("❌ Seed error:", error);
        process.exit(1);
    }
};

seedDatabase();
