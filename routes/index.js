const router = require('express').Router()
const UserController = require('../controllers/UserController.js')
const AnimalController = require('../controllers/AnimalController.js')
const { Authentication, Authorization, checkToken } = require('../middlewares/Auth.js')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.get('/animals', checkToken, AnimalController.getAnimals)
router.get('/animals/:animalId', checkToken, AnimalController.getAnimalById)

router.post('/favorites/:animalId', Authentication, AnimalController.addToFavorite)
router.delete('/favorites/:animalId', Authentication, AnimalController.removeFromFavorite)

module.exports = router