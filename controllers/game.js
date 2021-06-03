const axios = require('axios')
const {Question, Game} = require('../models')

class Controller {

    static async gameStart(req, res, next) {
        let gameData = {
            type: req.body.type,
            topic: req.body.topic,
            UserId: req.user.id
        }
        try {
            let sessionCreated = await Game.create(gameData) 
            res.status(201).json(sessionCreated)
        }
        catch(err){
            console.log(err);
        }
    }
    static async updateGameScore(req, res, next){
        console.log("HERE UPDATE");
        console.log(req.body);
        console.log("HEYHEY");
        let gameId = req.body.gameId
        let score = 0
        try{
            let questionData = await Question.findAll({where:{GameId:gameId}})
            questionData.forEach((el) =>{
                if(el.correctAnswer === el.userAnswer){
                    score++
                }
            })
            score = Math.round((score*10)/questionData.length)
            let gameDetail = await Game.findOne({
                where:{
                    id:gameId
            }})
            let data = {
                type: gameDetail.type,
                topic: gameDetail.topic,
                UserId: gameDetail.UserId,
                score: score
            }
            let updatedData = await Game.update(data, {
                where:{
                    id:gameId
                },
                returning:true
            })
            res.status(200).json(updatedData)
        }
        catch(err){
            console.log(err);
        }
    }
    static async getGameStats(req, res, next){
        console.log(req.body);
        let GameId = req.body.GameId
        try {
            let questionData = await Question.findAll({where:{GameId}})
            let gameData = await Game.findByPk(GameId)
            let data = {
                gameData,
                questionData
            }
            res.status(200).json(data)
        }
        catch(err){
            console.log(err);
        }
    }
}

module.exports= Controller