const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()

router.get('/result', Controller.result)

router.post('/sendEmail', Controller.sendEmail)

module.exports = router