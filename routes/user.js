const router = require("express").Router()
const controller = require("../controllers/user")
const authentication = require("../middlewares/authentication")

router.post("/register", controller.registerUser)
router.post("/login", controller.loginUser)
router.get("/profile", controller.getProfile)

router.get("/selfprofile", authentication, controller.getSelfProfile)


module.exports = router