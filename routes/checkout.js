const { checkout, createProduct, checkoutSession,getProduct } = require('../controllers/checkout')

const router = require('express').Router()

router.post('/checkout', checkout)
router.post('/products', createProduct)
router.get('/checkout/success', checkoutSession)
router.get('/products/:id',getProduct)


module.exports = router