const express = require("express")
const router = express.Router()
const authentication = require('../middlewares/authentication')

const userRoutes = require("./user")
const gameRoutes = require("./game")
const questionRoutes = require("./question")
const statsRoutes = require("./stats")

router.use("/users", userRoutes)
router.use(authentication)
router.use("/games", gameRoutes)
router.use("/question", questionRoutes)
router.use("/stats", statsRoutes)

module.exports = router