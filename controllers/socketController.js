// 'use strict'
// const axios = require('axios')
// const io = require('../server')

// let correct_answer
// let answers = []

// class Controller {
//     static async handle(socket) {
//         try {
//             console.log('user connected')
//             socket.on('submitChat', () => {
//                 // socket.broadcast.emit('receiveChat')
//                 axios({
//                     url: 'http://localhost:3000/questions',
//                     method: 'GET'
//                 })
//                     .then(({ data }) => {
//                         correct_answer = data.correct_answer
//                         answers.push
//                         io.sockets.emit('receiveQuestion', data)
//                         answer = []
//                         // socket.broadcast.emit('receiveQuestion', data)
//                         // socket.emit('receiveQuestion', data)
//                     })
//                     .catch(err => {
//                         console.log(err)
//                     })
//             })
//             // socket.on('getQuestion', () => {
//             //     axios({
//             //         url: 'http://localhost:3000/questions',
//             //         method: 'GET'
//             //     })
//             //         .then(({ data }) => {
//             //             // io.socket.emit('receiveQuestion', data)
//             //             // socket.broadcast.emit('receiveQuestion', data)
//             //             // socket.emit('receiveQuestion', data)
//             //         })
//             //         .catch(err => {
//             //             console.log(err)
//             //         })
//             // })
//         } catch (err) {
//             console.log(err)
//         }
//     }
// }

// module.exports = Controller
