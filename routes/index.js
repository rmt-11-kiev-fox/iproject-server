const express = require('express')
const FavouriteController = require('../controllers/favouriteController')
const MovieController = require('../controllers/movieController')
const UserController = require('../controllers/userController')
const authentication = require('../middlewares/authentication')
const router = express.Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(authentication)
router.get('/comingSoons', MovieController.fetchComingSoonMovie)
router.get('/nowPlayings', MovieController.fetchNowPlaying)
router.get('/cinemas', MovieController.fetchCinema)
router.get('/nameSearch', MovieController.searchMovieByName)

router.post('/watchLists', FavouriteController.addWatchList)
router.get('/watchLists', FavouriteController.fetchDataFavourite)

module.exports = router