const router = require("express").Router();
const currentDataRouter = require("./currentData");
const userRouter = require("./user");
const playlistRouter = require("./playlist");
const authentication = require("../middleWares/authentication");

router.use(currentDataRouter);
router.use(userRouter);
router.use(authentication);

// Router ini hanya untuk latihan, tidak dipakai saat deploy
router.use(playlistRouter);

module.exports = router;
