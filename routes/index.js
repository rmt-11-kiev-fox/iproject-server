const router = require('express').Router()
const UserController = require('../controllers/UserController.js')
const AnimalController = require('../controllers/AnimalController.js')
const { Authentication, Authorization, checkToken } = require('../middlewares/Auth.js')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.get('/animals', checkToken, AnimalController.getAnimals)

module.exports = router