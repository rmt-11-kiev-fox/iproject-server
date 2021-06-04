const router = require('express').Router()
const { register, login, getProfile, updateProfile } = require("../controllers/user")
const authentication = require('../middlewares/authentication')

router.post('/register', register)
router.post('/login', login)
router.get('/profile', authentication, getProfile)
router.put('/profile/edit', authentication, updateProfile)


module.exports = router