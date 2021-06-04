const userRoutes = require('express').Router()
const userController = require('../controllers/userController')

userRoutes.post('/register', userController.register)
userRoutes.post('/login', userController.login)
userRoutes.post('/googleLogin', userController.googleLogin)

module.exports = userRoutes