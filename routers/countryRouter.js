const CountryController = require('../controllers/countryController')

const countryRouter = require('express').Router()
countryRouter.get('/', CountryController.getAllCountries)

module.exports = countryRouter