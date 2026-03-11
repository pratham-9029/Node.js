const adminController = {
    homePage(req,res){
        return res.render('index.ejs');
    },
    addMoviePage(req,res){
        return res.render('./pages/add-movie.ejs');
    },
    viewMoviesPage(req,res){
        return res.render('./pages/view-movies.ejs');
    }
}

export default adminController;