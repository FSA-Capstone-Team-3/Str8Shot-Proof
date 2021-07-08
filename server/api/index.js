const router = require("express").Router();
module.exports = router;

router.use("/users", require("./users"));
router.use("/stations", require("./stations"));
router.use("/matches", require("./matches"));
router.use("/connections", require("./connections"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
