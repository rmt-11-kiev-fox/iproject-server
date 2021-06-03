const routes = require("express").Router();
const { UserController } = require("../controllers");
const { registerHandler, loginHandler } = UserController;

routes.post("/login", loginHandler);
routes.post("/register", registerHandler);

module.exports = routes;
