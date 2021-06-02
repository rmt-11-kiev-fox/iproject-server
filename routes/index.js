const express = require('express');
const app = express();

// IMPORT ROUTES
const userRoutes = require('./userRoutes')
const patientRoutes = require('./patientRoutes')
const symptomRoutes = require('./symptomRoutes')

// USE ROUTES WITH/WITHOUT PREFIXES
app.use(userRoutes)
app.use('/patients', patientRoutes)
app.use('/symptoms', symptomRoutes)

module.exports = app