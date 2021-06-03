const router = require('express').Router()
const Controller = require('../controllers/controller')

router.get('/reddit', Controller.getDataReddit)
router.get('/twitter', Controller.getTrendingTwitter)

module.exports = router;