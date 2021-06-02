const http = require('http')
const app = require('./app')
const port = process.env.PORT || 3000

app.set('port', port)

const server = http.createServer(app)

const axios = require('axios')

let isActiveServer = false
// let correct_answer
// let answers = []
let currentQuestion
// = {
//     category: null,
//     question: null,
//     answers: [],
//     correct_answer: null
// }

const io = require('socket.io')(server)
io.on('connection', socket => {
    socket.on('submitChat', () => {
        socket.broadcast.emit('receiveChat')
    })
    socket.on('getNewQuestion', () => {
        isActiveServer = true
        axios({
            url: 'http://localhost:3000/questions',
            method: 'GET'
        })
            .then(({ data }) => {
                const { category, question, correct_answer } = data
                let answers = [...data.incorrect_answers, data.correct_answer]
                answers = answers.sort((a, b) => a - b)
                currentQuestion = {
                    category,
                    question,
                    answers,
                    correct_answer
                }
                io.sockets.emit('receiveQuestion', currentQuestion)
                // const payload = {
                //     category,
                //     question,
                //     answers: currentQuestion.answers
                // }
                // correct_answer = null
                // answers = []
            })
            .catch(err => {
                console.log(err)
            })
    })
    socket.on('getServerStatus', () => {
        socket.emit('receiveServerStatus', isActiveServer)
    })
    socket.on('getCurrentQuestion', () => {
        socket.emit('receiveQuestion', currentQuestion)
    })
})

module.exports = { server, port, io }
