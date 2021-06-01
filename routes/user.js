const router = require('express').Router()
const { register , login, googleLogin} = require("../controllers/user")

router.post('/register', register)
router.post('/login', login)
router.post('/googleLogin', googleLogin)


module.exports = router