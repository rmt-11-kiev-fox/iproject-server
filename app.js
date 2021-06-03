require('dotenv').config()

const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')

const httpServer = require("http").createServer(app);
const options = {cors: {origin: '*'}};
const io = require("socket.io")(httpServer, options);
const router = require('./routes')
//Whenever someone connects this gets executed

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(router)
app.use(errorHandler)
app.set('io', io)

httpServer.listen(3000)
// app.listen(port, () => {
//   console.log(`Bismillah tugas terakhir!! http://localhost:${port}`)
// })
