const router = require("express").Router();
const CurrentData = require("../controllers/currentDataController.js");

router.get("/currentDatas", CurrentData.getData);

module.exports = router;
