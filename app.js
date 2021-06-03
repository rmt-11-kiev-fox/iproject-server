if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const router = require('./routes')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3000

// cors
app.use(cors())

// body parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(router)

app.listen(PORT, () => {
    console.log('Running emeizing at port', PORT);
})