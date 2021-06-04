const router = require('express').Router()
const userRouter = require('./userRouter')
const fitnessRouter = require('./fitnessRouter')
const apiRouter = require('./apiRouter')

router.use('/user', userRouter)
router.use('/fitness', fitnessRouter)
router.use(apiRouter)

module.exports = router


