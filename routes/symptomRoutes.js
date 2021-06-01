const express = require('express')
const route = express.Router()

// AUTHS
const authentication = require('../middlewares/authentication')

// CONTROLLERS
const PatientController = require('../controllers/patientController')

route.use(authentication)
route.get('/', PatientController.getSymptoms)

module.exports = route