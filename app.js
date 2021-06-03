if(process.env.NODE_ENV != 'production'){
  require('dotenv').config()
}
const cors = require('cors')
const express = require('express')
const app = express()
const route = require('./routes')
const port = process.env.PORT || 3000
const errHandler = require('./middlewares/errHandler')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.use(route)
app.use(errHandler)

app.listen(port, () => {
  console.log(`apakah benar kalau beli C 1000 3 botol, jadi C ${port}?`)
})