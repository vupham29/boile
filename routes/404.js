const errorController = require("../controllers/404");
const router = require('express').Router();

router.use(errorController.get404Page);

module.exports = router;