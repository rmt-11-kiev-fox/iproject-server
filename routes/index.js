const router = require("express").Router();
const userRouter = require("./UserRouter");

router.use(userRouter);

module.exports = router;
