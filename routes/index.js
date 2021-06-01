const router = require('express').Router()

const userRouter = require('./user')
const charityRouter = require('./charity')
const checkoutRouter = require('./checkout')

router.use('/', userRouter)
router.use('/',charityRouter)
router.use('/',checkoutRouter)

module.exports = router