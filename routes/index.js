const router = require('express').Router()

const userRouter = require('./user')
const charityRouter = require('./charity')
const checkoutRouter = require('./checkout')
const donationRouter = require('./donation')
const authentication = require('../middlewares/authentication')

router.use('/', userRouter)
router.use('/', charityRouter)
router.use(authentication)
router.use('/', checkoutRouter)
router.use('/', donationRouter)

module.exports = router