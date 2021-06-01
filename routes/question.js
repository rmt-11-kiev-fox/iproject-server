const router = require("express").Router()
const controller = require("../controllers/question")

router.get('/getQuestion', controller.getQuestion)
router.put('/answerQuestion', controller.answerQuestion)
module.exports = router