const router = require("express").Router()
const controller = require("../controllers/game")

router.post('/start', controller.gameStart)
router.put('/updateScore', controller.updateGameScore)
router.post('/gameStats', controller.getGameStats)

module.exports = router