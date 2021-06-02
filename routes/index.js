const express = require("express");
const router = express.Router();
const { map, covid } = require("../controllers");

router.post("/map/suggestions", map.suggestions);
router.get("/covid", covid.fetchAll);
router.post("/login");

module.exports = router;
