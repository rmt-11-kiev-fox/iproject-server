const http = require('http')
const app = require('./app')
const port = process.env.PORT || 3000
const axios = require('axios')

app.set('port', port)

const server = http.createServer(app)

const io = require('socket.io')(server)
// const socketController = require('./controllers/socketController')
let correct_answer
let answers = []

io.on('connection', socket => {
    socket.on('submitChat', () => {
        socket.broadcast.emit('receiveChat')
    })
    socket.on('getQuestion', () => {
        axios({
            url: 'http://localhost:3000/questions',
            method: 'GET'
        })
            .then(({ data }) => {
                const { category, question } = data
                correct_answer = data.correct_answer
                answers = [...data.incorrect_answers, data.correct_answer]
                answers = answers.sort((a, b) => a - b)
                const payload = {
                    category,
                    question,
                    answers
                }
                // socket.broadcast.emit('receiveQuestion', data)
                io.sockets.emit('receiveQuestion', payload)
                correct_answer = null
                answers = []
            })
            .catch(err => {
                console.log(err)
            })
    })
})

module.exports = { server, port, io }
