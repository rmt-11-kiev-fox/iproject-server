const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");

let userRouter = require("./user");
let apiRouter = require("./api");
let watchWishlistRouter = require("./watchWishlist");

router.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World" });
});
router.use(userRouter);
router.use(apiRouter);
router.use(authentication, watchWishlistRouter);

module.exports = router;
