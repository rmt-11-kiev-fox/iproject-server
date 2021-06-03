const router = require("express").Router();
const userRouter = require("./UserRouter");
const musicRouter = require("./MusicSearch");
const authentication = require("../middlewares/authentication.js");

router.use(userRouter);
router.use(authentication);
router.use(musicRouter);

module.exports = router;
