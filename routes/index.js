const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");

let userRouter = require("./user");
let apiRouter = require("./api");
let reviewRouter = require("./review");
let watchWishlistRouter = require("./watchWishlist");

router.use(userRouter);
router.use(apiRouter);
router.use(authentication, reviewRouter);
router.use(authentication, watchWishlistRouter);

module.exports = router;
