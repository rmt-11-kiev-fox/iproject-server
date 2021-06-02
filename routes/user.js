const router = require("express").Router()
const controller = require("../controllers/user")

router.post("/register", controller.registerUser)
router.post("/login", controller.loginUser)
router.get("/profile", controller.getProfile)


module.exports = router