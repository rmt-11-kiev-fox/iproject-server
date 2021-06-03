const route = require('express').Router()
const DrinkCTRL = require('../controllers/DrinkCTRL')
const {authentication} = require('../middlewares/auth')

route.post('/register', DrinkCTRL.register)


route.use(authentication)

route.get('/random', DrinkCTRL.random)
route.get('/specific', DrinkCTRL.specific)

route.get('/halal', DrinkCTRL.halal)
route.get('/nonHalal', DrinkCTRL.nonHalal)







module.exports = route