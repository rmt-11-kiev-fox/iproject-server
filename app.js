if(process.env.NODE_ENV !== 'production'){
  require ('dotenv').config()
}
const express = require('express')
const app = express()
const httpServer = require('http').createServer(app)
const port = process.env.PORT|| 3000
const io = require("socket.io")(httpServer, {});
const errorHandler = require('./middlewares/errorHandler')
const router = require('./routes/index')
const cors = require('cors')

io.on("connection", socket=>{
  // console.log("yay connect")
  socket.on("SendMsg", (data)=>{
    // console.log (data, "mmmamang")
    io.emit('sendBack', data)
  })
})

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
    
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(router)
// app.use(errorHandler)



httpServer.listen(port, () => {
  console.log(`I Love you ${port}`)
})