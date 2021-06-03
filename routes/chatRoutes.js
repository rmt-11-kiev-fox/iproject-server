'use strict'
const express = require('express')
const router = express.Router()

const Controller = require('../controllers/chatController')

router.get('/', Controller.get)
router.post('/', Controller.post)

module.exports = router
