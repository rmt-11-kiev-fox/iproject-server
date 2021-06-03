'use strict'
const express = require('express')
const router = express.Router()

const Controller = require('../controllers/userController')
const { authorizeSocket } = require('../middlewares/auth')

router.post('/register', Controller.register)
router.post('/login', Controller.login)

router.patch('/users/:id', authorizeSocket, Controller.updatePoint) // dari socket

module.exports = router
