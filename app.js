'use strict'
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const express = require('express')
const app = express()

const routes = require('./routes')
const cors = require('cors')
const erroHandler = require('./middlewares/errorHandler')

app.use(cors())

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(routes)
app.use(erroHandler)

module.exports = app
