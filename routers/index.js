const router = require('express').Router()
const userRouter = require('./userRouter')
const fitnessRouter = require('./fitnessRouter')

router.use('/user', userRouter)
router.use('/fitness', fitnessRouter)

module.exports = router


