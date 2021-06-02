const express = require("express");
const router = express.Router();
const { map } = require("../controllers");

router.post("/suggestions", map.suggestions);
router.post("/near", map.nearest);

module.exports = router;
