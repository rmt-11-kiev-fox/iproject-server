const apiController = require('../controllers/apiController')
const apiRouter = require('express').Router()

apiRouter.get('/fetchFood/:q', apiController.fetchFoodApi)

apiRouter.get('/fetchQuotes', apiController.fetchRandomQuotes)

apiRouter.get('/fetchBMI', apiController.fetchBMI)

module.exports = apiRouter