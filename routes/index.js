const router = require('express').Router()
const UserController = require('../controllers/UserController.js')
const AnimalController = require('../controllers/AnimalController.js')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

module.exports = router