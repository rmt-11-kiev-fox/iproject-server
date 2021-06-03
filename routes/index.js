'use strict'
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Trivia App - server')
})

const userRouter = require('./userRoutes')
const questionRouter = require('./questionRoutes')
const chatRouter = require('./chatRoutes')
const socketRouter = require('./socketRoutes')

const userController = require('../controllers/userController')
const { authenticate } = require('../middlewares/auth')

router.use(userRouter)
router.use('/questions', questionRouter) // dari socket, public
router.use(socketRouter)

router.use(authenticate)
router.get('/users', userController.getAll)
router.use('/chats', chatRouter)

module.exports = router
