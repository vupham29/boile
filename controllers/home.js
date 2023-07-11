exports.getHomePage = (req, res, next) => {
    res.render('pages/home', {
        title: 'Home'
    });
};