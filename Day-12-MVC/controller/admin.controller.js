const adminController = {
    homePage: (req, res) => {
        return res.render('index.ejs');
    },
    addMoviePage: (req, res) => {
        return res.render('./pages/add-movie.ejs');
    }
};

export default adminController;
