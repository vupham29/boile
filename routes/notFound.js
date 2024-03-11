const router = require("express").Router(); // eslint-disable-line

router.get("*", (_, __, next) => {
  next(new Error("Can not find the page"));
});

module.exports = router;
