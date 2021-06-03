const FavouriteController = require('../controllers/favouriteController')

const favRouter = require('express').Router()
favRouter.get('/', FavouriteController.getAllFav)
favRouter.post('/', FavouriteController.addFav)
favRouter.delete('/:favouriteId', FavouriteController.deleteFav)


module.exports = favRouter