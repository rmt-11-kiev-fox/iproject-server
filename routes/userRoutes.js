const express = require('express')
const route = express.Router()

// CONTROLLERS
const UserControllers = require('../controllers/userController')

route.post('/register', UserControllers.register);
route.post('/login', UserControllers.login);

module.exports = route