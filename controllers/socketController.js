'use strict'
const axios = require('axios')
const { Chat } = require('../models')
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
            socket.on('submitAnswer', payload => {
                const { currentUser, timeLeft, answer } = payload
                const { id, point } = currentUser
                let newPoint
                if (answer === currentCorrectAnswer) {
                    const increment = timeLeft * 10
                    newPoint = point + increment
                    Controller.updatePoint(id, newPoint)
                        .then(() => {
                            return Chat.create({
                                message: `${currentUser.username} got ${increment} points!`
                                // message: `${currentUser.username} guessed the correct answer and got ${increment} points! ${currentUser.username} has ${newPoint} points now!`
                            })
                        })
                        .then(() => {
                            socket.emit('correctAnswer', {
                                newPoint,
                                increment
                            })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                } else {
                    const decrement = -20
                    newPoint = point + decrement
                    Controller.updatePoint(id, newPoint)
                        .then(() => {
                            return Chat.create({
                                message: `${currentUser.username} got ${decrement} points!`
                                // message: `${currentUser.username} guessed the wrong answer and got ${decrement} points! ${currentUser.username} has ${newPoint} points now!`
                            })
                        })
                        .then(() => {
                            socket.emit('wrongAnswer', {
                                newPoint,
                                decrement
                            })
                        })
                        .catch(err => {
                            console.log(err)
                        })
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

    static updatePoint(UserId, point) {
        return axios({
            url: `http://localhost:3000/users/${UserId}`,
            method: 'PATCH',
            headers: {
                socket_key: process.env.SOCKET_AUTH_KEY
            },
            data: {
                point
            }
        }).catch(err => {
            console.log(err)
        })
    }
}

module.exports = Controller
