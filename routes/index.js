const express = require("express");
const router = express.Router();
const { map, covid, user } = require("../controllers");

router.post("/map/suggestions", map.suggestions);
router.get("/covid", covid.fetchAll);
router.post("/login", user.login);
router.post("/register", user.register);
router.get("/", (req, res) => {
	res.status(200).json({ message: "Welcome to Manis" });
});

module.exports = router;
