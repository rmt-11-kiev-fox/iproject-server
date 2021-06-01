const {Question, Game} = require("../models")
const axios = require('axios')

class Controller {
    static async gameCreateQuestion (req, res, next) {
        let urlApi = 'https://collectionapi.metmuseum.org'
        let topic = req.body.topic
        try{
            let urlTopic = urlApi+`/public/collection/v1/search?q=${topic}`
            let objectTopic = await axios({
                url: urlTopic
            })
            let objectTopicRefined = objectTopic.data.objectIDs
            let questionIDs = []
            for (let i = 0; i < 4; i++) {
                let randomID = Math.floor(Math.random() * objectTopicRefined.length);
                let urlObject = urlApi+`/public/collection/v1/objects/${objectTopicRefined[randomID]}`
                let objectData = await axios({
                    url:urlObject
                })
                let objectDataRefined
                if( objectData.data.constituents){
                    objectDataRefined = {
                        name: objectData.data.constituents[0].name,
                        title: objectData.data.title,
                        imageUrl: objectData.data.primaryImageSmall
                    }
                } else{
                    objectDataRefined = {
                        name: '',
                        title: objectData.data.title,
                        imageUrl: objectData.data.primaryImageSmall
                    }
                }
                questionIDs.push(objectDataRefined)
                objectTopicRefined.splice(randomID, 1)
            }
            return questionIDs
        }
        catch(err){
            console.log(err);
        }
    }
    static async getQuestion (req, res, next) {
        let alphabet = ['a', 'b', 'c', 'd']
        let GameId = req.body.GameId
        try{
            let randomNumber = Math.floor(Math.random()*4)
            let data = await Controller.gameCreateQuestion(req, res, next)
            let question = {
                answer: alphabet[randomNumber],
                correctData: data[randomNumber],
                answersData: data
            }
            let questionData = Question.create({
                correctAnswer : alphabet[randomNumber],
                GameId : GameId
            })
            question.answersData = data
            res.status(200).json(question)
        }
        catch(err){
            console.log(err);
        }
    }
    static async answerQuestion (req, res, next){
        let userAnswer = req.body.answer
        let id = req.body.questionId
        try{
            let questionDetail = await Question.findByPk(id)    
            let data = {
                correctAnswer: questionDetail.correctAnswer,
                GameId: questionDetail.GameId,
                userAnswer
            }
            let updatedData = await Question.update(data, {
                where:{
                    id
                }, returning:true
            })
            res.status(200).json(updatedData)
        }
        catch(err){
            console.log(err);
        }
    }
}

module.exports = Controller