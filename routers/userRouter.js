const UserController = require('../controllers/userController')

const userRouter = require('express').Router()
userRouter.post('/register', UserController.register)
userRouter.post('/login', UserController.login)
userRouter.post('/googleLogin', UserController.googleLogin)
module.exports = userRouter