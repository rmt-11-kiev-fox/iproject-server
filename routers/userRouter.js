const userController = require('../controllers/userController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

const userRouter = require('express').Router()

userRouter.post('/register', userController.register)

userRouter.post('/login', userController.login)

// userRouter.use(authentication)

// userRouter.patch('/changeSetting/:id', userController.changeSetting)

module.exports = userRouter