const express = require('express')
const route = express.Router()

// AUTHS
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

// CONTROLLERS
const PatientController = require('../controllers/patientController')

// NOTE: THIS ROUTE IS USING '/patients' PREFIX
route.use(authentication)
route.get('/', PatientController.allPatients)
route.get('/:id', PatientController.patientDetails)
route.post('/', PatientController.newPatient)


route.use('/:id', authorization)
route.put('/:id', PatientController.updatePatient)
route.delete('/:id', PatientController.deletePatient)

module.exports = route