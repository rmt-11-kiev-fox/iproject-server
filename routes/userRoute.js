const router = require("express").Router();
const user = require("../controllers/userController");

router.post("/signin", user.signin);
router.post("/signup", user.signup);

module.exports = router;
