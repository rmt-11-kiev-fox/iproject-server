if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}
const express = require('express')
const indexRouter = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')

const app = express()
const PORT = +process.env.PORT || 3000


app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())
app.use(indexRouter)
app.use(errorHandler)


app.listen(PORT, (req, res) => {
    console.log(`This app is running on port: ${PORT}`)
})