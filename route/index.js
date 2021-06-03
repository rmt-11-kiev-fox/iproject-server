const route = require('express').Router()
const Controller = require('../controller/Controller')
const { authLogin } = require('../middleware/authentication')

route.post('/login', Controller.login)
route.post('/register', Controller.register)
route.post('/google-login', Controller.GoogleLogin)

route.use(authLogin)

route.get('/filterbyspecies/:q', Controller.filterBySpecies)
route.get('/filterbycountries/:q', Controller.filterByQountry)
route.get('/filterbyKingdom/:q', Controller.filterByKingdom)

route.post('/sendMsg', Controller.sendMsg)
route.get('/readMsg', Controller.readMsg)

route.get('/data', Controller.readNewSpecies)
route.post('/add', Controller.addNewSpecies)
route.put('/update/:id', Controller.updateNewSpecies)
route.delete('/delete/:id', Controller.DeleteNewSpecies)

module.exports = route