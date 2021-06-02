'use strict'
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Trivia App - server')
})

const userRouter = require('./userRoutes')
const questionRouter = require('./questionRoutes')
const chatRouter = require('./chatRoutes')
const { authenticate } = require('../middlewares/auth')

router.use(userRouter)
router.use('/questions', questionRouter)

router.use(authenticate)
router.use('/chats', chatRouter)

module.exports = router
