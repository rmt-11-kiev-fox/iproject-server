if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}
const express = require('express')
const app = express()
const port = process.env.PORT
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')

const httpServer = require("http").createServer(app);
const options = {cors: {origin: '*'}};
const io = require("socket.io")(httpServer, options);
const router = require('./routes')
const task = require('./scheduler')
//Whenever someone connects this gets executed

// io.on('connection', function (socket) {
//   socket.on('closeBid', function(data){
//     console.log('close', data)
//   });
// });
task.closeBid(io).start();
task.openBid(io).start();


app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(router)
app.use(errorHandler)
app.set('io', io)

httpServer.listen(port)
// app.listen(port, () => {
//   console.log(`Bismillah tugas terakhir!! http://localhost:${port}`)
// })
