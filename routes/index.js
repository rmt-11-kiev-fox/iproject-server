const express = require("express");
const router = express.Router();
const { map, covid, user } = require("../controllers");

router.post("/map/suggestions", map.suggestions);
router.get("/covid", covid.fetchAll);
router.post("/login", user.login);
router.post("/register", user.register);

module.exports = router;
