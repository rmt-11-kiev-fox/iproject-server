const routes = require("express").Router();
const { OngkirController } = require("../controllers");
const { getCityHandler, getOngkirHandler } = OngkirController;

routes.get("/ongkir/city", getCityHandler);
routes.get("/ongkir/:userId", getOngkirHandler);

module.exports = routes;
