'use strict'
const axios = require('axios')
let isActiveServer = false
// let correct_answer
// let answers = []
let currentQuestion = {
    category: null,
    question: null,
    answers: [],
    correct_answer: null
}

let connectedClients = []

class Controller {
    static handle(io) {
        io.on('connection', socket => {
            connectedClients.push(socket.id)
            console.log('USER CONNECTED WITH ID:', socket.id)
            console.log(connectedClients)
            socket.on('disconnect', () => {
                console.log(`USER ${socket.id} DISCONNECTED`)
                const index = connectedClients.indexOf(socket.id)
                connectedClients.splice(index, 1)
                console.log(connectedClients)
            })
            socket.on('submitChat', () => {
                socket.broadcast.emit('receiveChat')
                // console.log(connectedClients, '<<<<<')
            })
            socket.on('getNewQuestion', () => {
                // isActiveServer = true
                axios({
                    url: 'http://localhost:3000/questions',
                    method: 'GET'
                })
                    .then(({ data }) => {
                        const { category, question, correct_answer } = data
                        let answers = [
                            ...data.incorrect_answers,
                            data.correct_answer
                        ]
                        answers = answers.sort((a, b) => a - b)
                        currentQuestion = {
                            category,
                            question,
                            answers,
                            correct_answer
                        }
                        io.sockets.emit('receiveQuestion', currentQuestion)
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
            socket.on('startTrivia', () => {
                let counter = 10
                const timer = () => {
                    console.log(`counter: ${counter}`)
                    io.sockets.emit('receiveTimeLeft', counter)
                    counter--
                    if (!counter) {
                        clearInterval(interval)
                        if (connectedClients.length) {
                            counter = 10
                            interval = setInterval(timer, 1000)
                        }
                    }
                }
                let interval = setInterval(timer, 1000)
            })
        })
    }
}

module.exports = Controller
