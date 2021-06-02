const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");

let userRouter = require("./user");
let movieRouter = require("./movie");
let reviewRouter = require("./review");
let watchWishlistRouter = require("./watchWishlist");

router.use(userRouter);
router.use(movieRouter);
router.use(authentication, reviewRouter);
router.use(authentication, watchWishlistRouter);

module.exports = router;
