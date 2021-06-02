const router = require('express').Router()
const Controller = require('../controllers/controller')
const Authentication = require('../middlewares/authentication')
const Authorization = require('../middlewares/authorization')

router.post('/register', Controller.register)
router.post('/login', Controller.login)

router.use(Authentication)
router.post('/collect', Controller.createCollect)
router.get('/collect', Controller.showCollect)

module.exports = router