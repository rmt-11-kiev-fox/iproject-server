
const productRoute = require('express').Router()
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const productController = require('../controllers/productController')

//  can both
productRoute.get('/', productController.fetchProduct) //fetch all
productRoute.get('/products/:id', productController.findProduct) // findOne

// customer side
productRoute.get('/like', authentication, productController.fetchLiked)
productRoute.post('/like', authentication, productController.addProductToLiked)
productRoute.post('/addBid', authentication, productController.joinBidAuction)
productRoute.get('/history', authentication, productController.getHistoryOfBiding)
productRoute.get('/bidList', authentication, productController.findBidByProduct)
productRoute.patch('/products/:id', authentication, productController.updateStatus) // updateStatus

// admin side
productRoute.post('/products', authentication, authorization, productController.addProduct) // add
productRoute.put('/products/:id', authentication, authorization, productController.editProduct) // edit
productRoute.delete('/products/:id', authentication, authorization, productController.deleteProduct) // delete


module.exports = productRoute