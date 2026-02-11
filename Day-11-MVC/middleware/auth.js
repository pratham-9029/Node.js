// Authentication middleware
export const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        req.user = req.session.user;
        return next();
    }
    if (req.xhr || req.headers.accept?.includes("json")) {
        return res.status(401).json({ error: "Please login to continue" });
    }
    return res.redirect("/auth/login");
};

// Admin-only middleware
export const isAdmin = (req, res, next) => {
    if (req.session && req.session.user && req.session.user.role === "admin") {
        req.user = req.session.user;
        return next();
    }
    if (req.xhr || req.headers.accept?.includes("json")) {
        return res.status(403).json({ error: "Admin access required" });
    }
    return res.redirect("/auth/login");
};

// Guest-only middleware (for login/register pages)
export const isGuest = (req, res, next) => {
    if (req.session && req.session.user) {
        return res.redirect(req.session.user.role === "admin" ? "/admin" : "/");
    }
    return next();
};

// Set user in locals for all views
export const setUserLocals = (req, res, next) => {
    res.locals.currentUser = req.session?.user || null;
    res.locals.isAuthenticated = !!req.session?.user;
    res.locals.isAdmin = req.session?.user?.role === "admin";
    next();
};
