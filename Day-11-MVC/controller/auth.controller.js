import User from "../models/User.js";

const authController = {
    // GET /auth/login
    loginPage: (req, res) => {
        res.render("auth/login", {
            title: "Login — CineVerse",
            error: null
        });
    },

    // GET /auth/register
    registerPage: (req, res) => {
        res.render("auth/register", {
            title: "Register — CineVerse",
            error: null
        });
    },

    // POST /auth/login
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user || !(await user.comparePassword(password))) {
                return res.render("auth/login", {
                    title: "Login — CineVerse",
                    error: "Invalid email or password"
                });
            }

            if (!user.isActive) {
                return res.render("auth/login", {
                    title: "Login — CineVerse",
                    error: "Your account has been deactivated"
                });
            }

            // Update last login
            user.lastLogin = new Date();
            await user.save();

            // Set session
            req.session.user = {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                avatar: user.avatar
            };

            if (user.role === "admin") {
                return res.redirect("/admin");
            }
            return res.redirect("/");
        } catch (error) {
            console.error("Login error:", error);
            res.render("auth/login", {
                title: "Login — CineVerse",
                error: "Something went wrong. Try again."
            });
        }
    },

    // POST /auth/register
    register: async (req, res) => {
        try {
            const { username, email, password, confirmPassword } = req.body;

            if (password !== confirmPassword) {
                return res.render("auth/register", {
                    title: "Register — CineVerse",
                    error: "Passwords do not match"
                });
            }

            const existingUser = await User.findOne({
                $or: [{ email }, { username }]
            });

            if (existingUser) {
                return res.render("auth/register", {
                    title: "Register — CineVerse",
                    error: existingUser.email === email
                        ? "Email already registered"
                        : "Username already taken"
                });
            }

            const user = new User({ username, email, password });
            await user.save();

            // Auto-login after register
            req.session.user = {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                avatar: user.avatar
            };

            return res.redirect("/");
        } catch (error) {
            console.error("Register error:", error);
            res.render("auth/register", {
                title: "Register — CineVerse",
                error: "Something went wrong. Try again."
            });
        }
    },

    // GET /auth/logout
    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) console.error("Logout error:", err);
            res.redirect("/auth/login");
        });
    }
};

export default authController;
