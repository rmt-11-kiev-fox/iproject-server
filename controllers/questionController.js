'use strict'
const axios = require('axios')

class Controller {
    static get(req, res, next) {
        axios({
            // url: 'https://opentdb.com/api.php?amount=1&type=multiple',
            url: 'https://opentdb.com/api.php?amount=1&difficulty=easy&type=multiple', // easy questions
            method: 'GET'
        })
            .then(({ data }) => {
                // console.log(data)
                const {
                    category,
                    question,
                    correct_answer,
                    incorrect_answers
                } = data.results[0]
                res.status(200).json({
                    category,
                    question,
                    correct_answer,
                    incorrect_answers
                })
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = Controller
