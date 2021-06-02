const express = require("express");
const router = express.Router();

const mapRoutes = require("./map_routes");
const covidRoutes = require("./covid_routes");

router.use("/map", mapRoutes);
router.use("/covid", covidRoutes);

module.exports = router;
