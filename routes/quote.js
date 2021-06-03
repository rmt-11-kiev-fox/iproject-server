const router = require("express").Router()
const controller = require("../controllers/quote")

router.get('/getQuote', controller.getQuote)
module.exports = router