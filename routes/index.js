const router = require('express').Router()
const UserController = require('../controllers/UserController.js')
const AnimalController = require('../controllers/AnimalController.js')
const { Authentication, Authorization } = require('../middlewares/Auth.js')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(Authentication)
router.get('/animals', AnimalController.getAnimals)
router.get('/animals/:animalId', AnimalController.getAnimalById)
router.post('/favorites/:animalId', AnimalController.addToFavorite)
router.delete('/favorites/:animalId', AnimalController.removeFromFavorite)
router.get('/favorites', AnimalController.getFavorites)

module.exports = router