'use strict'
const axios = require('axios')
let isActiveServer = false
let currentCorrectAnswer
let currentQuestion = {
    category: '',
    question: '',
    answers: ['', '', '', '']
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
            })
            socket.on('getNewQuestion', () => {
                Controller.getNewQuestion()
                    .then(fetchedQuestion => {
                        currentQuestion = fetchedQuestion
                        io.sockets.emit('receiveQuestion', currentQuestion)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            socket.on('getServerStatus', () => {
                //
                socket.emit('receiveServerStatus', isActiveServer)
            })
            socket.on('getCurrentQuestion', () => {
                // console.log('MASUK SINI', '<<<<<')
                socket.emit('receiveQuestion', currentQuestion)
            })
            socket.on('startTrivia', () => {
                // set is active server
                isActiveServer = true
                io.sockets.emit('startTrivia')
                let counter = 10
                const timer = () => {
                    console.log(`counter: ${counter}`)
                    io.sockets.emit('receiveTimeLeft', counter)
                    counter--
                    if (counter < 0) {
                        io.sockets.emit(
                            'receiveCorrectAnswer',
                            currentCorrectAnswer
                        )
                        clearInterval(interval)
                        if (connectedClients.length) {
                            Controller.getNewQuestion()
                                .then(currentQuestion => {
                                    io.sockets.emit(
                                        'receiveQuestion',
                                        currentQuestion
                                    )
                                    counter = 10
                                    io.sockets.emit('receiveTimeLeft', counter)
                                    interval = setInterval(timer, 1000)
                                })
                                .catch(err => {
                                    console.log(err)
                                })
                        } else {
                            isActiveServer = false
                        }
                    }
                }
                let interval = setInterval(timer, 1000)
            })
            socket.on('submitAnswer', answer => {
                if (answer === currentCorrectAnswer) {
                    socket.emit('correctAnswer')
                } else {
                    socket.emit('wrongAnswer')
                }
            })
        })
    }

    static getNewQuestion() {
        return axios({
            url: 'http://localhost:3000/questions',
            method: 'GET'
        }).then(({ data }) => {
            const { category, question, correct_answer } = data
            currentCorrectAnswer = correct_answer
            let answers = [...data.incorrect_answers, data.correct_answer]
            answers = answers.sort((a, b) => a - b)
            return {
                category,
                question,
                answers
            }
        })
    }
}

module.exports = Controller
