const router = require('express').Router()
const UserController = require('../controllers/UserController')
const AnimeFavController = require('../controllers/AnimeFavController')
const Anime = require('../controllers/Anime')
const {authentic} = require('../middlewares/authentication')
const {authorized} = require('../middlewares/authorization')


router.post('/register',UserController.register)
router.post('/login', UserController.login)
router.post('/glogin', UserController.glogin)
// router.get('/animes', Anime.anime)       
router.use(authentic)
router.post('/anime',AnimeFavController.postAnime)
router.get('/anime/:anime', Anime.anime)
router.use('/anime/:id', authorized)
router.delete('/anime/:id',AnimeFavController.deleteAnime)


module.exports = router