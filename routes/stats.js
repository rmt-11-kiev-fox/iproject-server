const router = require("express").Router()
const controller = require("../controllers/stats")

router.get('/', controller.getStats)
router.get('/mostPlayed', controller.mostPlayed)
router.get('/leaderboard', controller.leaderboards)
module.exports = router 