const { checkout, createProduct, checkoutSession } = require('../controllers/checkout')

const router = require('express').Router()

router.post('/checkout', checkout)
router.post('/products', createProduct)
router.get('/checkout/success', checkoutSession)


module.exports = router