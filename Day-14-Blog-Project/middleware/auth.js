const auth = (req, res, next) => {
    if (req.cookies.id) {
        next();
    } else {
        res.redirect('/login');
    }
}

export default auth;