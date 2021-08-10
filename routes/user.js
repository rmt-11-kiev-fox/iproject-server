const express = require("express");
const router = express();
const Controller = require("../controllers/user");

router.post("/register", Controller.registerUser);
router.post("/login", Controller.loginUser);

module.exports = router;
