'use strict'
const express = require('express')
const router = express.Router()

const Controller = require('../controllers/questionController')

router.get('/', Controller.get)

module.exports = router
