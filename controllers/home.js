exports.getHomePage = (req, res, next) => {
    res.render('pages/home', {
        pageTitle: 'Home',
        path: 'home',
    });
};