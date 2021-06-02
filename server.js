const http = require('http')
const app = require('./app')
const port = process.env.PORT || 3000

app.set('port', port)

const server = http.createServer(app)

const io = require('socket.io')(server)
const socketController = require('./controllers/socketController')
socketController.handle(io)

module.exports = { server, port }
