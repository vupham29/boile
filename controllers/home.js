exports.getHomePage = (req, res, next) => {
    res.render('home', {
        pageTitle: 'Home',
        path: 'home',
    });
};