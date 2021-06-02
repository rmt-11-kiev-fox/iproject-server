const router = require("express").Router();
const userRouter = require("./UserRouter");
const musicRouter = require("./MusicSearch");

router.use(userRouter);
router.use(musicRouter);

module.exports = router;
