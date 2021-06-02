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
// admin side
productRoute.post('/products', authentication, authorization, productController.addProduct) // add
productRoute.put('/products/:id', authentication, authorization, productController.editProduct) // edit
productRoute.patch('/products/:id', authentication, authorization, productController.updateStatus) // updateStatus
productRoute.delete('/products/:id', authentication, authorization, productController.deleteProduct) // delete



module.exports = productRoute