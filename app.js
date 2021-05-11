if(process.env.NODE_ENV !== "production"){
    require('dotenv').config()
}

const cors = require('cors')
const express = require('express')
const app = express()
const router = require('./routes')
const errorHandler = require('./middlewares/ErrorHandlers')
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/', router)
app.use(errorHandler)

app.listen(PORT, () =>{
    console.log('Running');
})