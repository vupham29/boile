exports.get404Page = (req, res, next) => {
    res.render('pages/404', {
        title: 'Not Found',
        path: '404',
    });
};