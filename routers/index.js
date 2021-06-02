const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()

router.get('/result', Controller.result)
router.post('/sendEmail', Controller.sendEmail)
router.get('/exchangeRate', Controller.exchangeRate)

module.exports = router