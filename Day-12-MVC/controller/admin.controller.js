const adminController = {
    homePage: (req, res) => {
        return res.render('index');
    },
    addMoviePage: (req, res) => {
        return res.render('./pages/add-movie');
    },
    viewMoviePage: (req, res)=>{
        return res.render('pages/view-movie')
    }


};

export default adminController;
