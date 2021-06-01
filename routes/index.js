const router = require("express").Router();
const user = require("./userRoute.js");
const product = require("./productRoute.js");

router.use("/users", user);
router.use("/products", product);

module.exports = router;
