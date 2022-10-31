const router = require('express').Router();

router.use((req, res, next) => {
    res.render('404', {
        pageTitle: 'Not Found',
        path: 'error404',
    });
});

module.exports = router;