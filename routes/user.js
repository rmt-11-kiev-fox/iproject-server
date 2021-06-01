const router = require("express").Router();
const UserController = require("../controllers/userController");
const authentication = require("../middleWares/authentication");

router.post("/users/register", UserController.register);
router.post("/users/login", UserController.login);
router.put("/users/changePassword", authentication, UserController.changePassword);

module.exports = router;
