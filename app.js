if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}
const cors = require('cors')
const express = require(`express`)
const errorHandler = require('./middlewares/errorHandler')
const router = require('./routers')
const app = express()
const port = process.env.PORT || 3000
const httpServer = require('http').createServer(app)
const io = require('socket.io')(httpServer, {})
io.on('connection', socket => {

})
app.use(cors({ origin: true, credentials: true }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(router)
app.use(errorHandler)
app.listen(port, ()=>{
    console.log(`listening from port: ${port}`);
})
httpServer.listen(port, () => {
    console.log(`listening from port: ${port}`);
})