const express = require("express");
const router = express.Router();
const { covid } = require("../controllers");

router.get("/", covid.fetchAll);

module.exports = router;
