const router = require('express').Router();

router.use((req, res, next) => {
    res.render('pages/404', {
        pageTitle: 'Not Found',
        path: '404',
    });
});

module.exports = router;