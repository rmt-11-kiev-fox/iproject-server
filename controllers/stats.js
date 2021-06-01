const {Game, User} = require('../models')

class Controller{
    static async getStats(req, res, next){
        let UserId = req.user.id
        try{
            let data = await Game.findAll({where:{UserId}})
            let scores = []
            data.forEach((el) =>{
                scores.push(el.score)
            })
            res.status(200).json(scores)
        }
        catch(err){
            console.log(err);
        }
    }
    static async mostPlayed(req, res, next){
        try{
            let userDatas = await User.findAll()
            let mostPlayedData = []
            for (let i = 0; i < userDatas.length; i++) {
                let UserId = userDatas[i].id
                let gameData = await Game.findAll({where:{UserId}})
                let data = {
                    name: userDatas[i].name,
                    gamePlayed: gameData.length
                }
                mostPlayedData.push(data)
            }
            mostPlayedData.sort(function (a, b){
                return b.gamePlayed - a.gamePlayed
            })
            res.status(200).json({message:"okay", mostPlayedData})
        }
        catch(err){
            console.log(err);
        }
    }
    static async leaderboards(req, res, next) {
        try{
            let user = await User.findAll()
            let leaderboardsData = []
            for (let i = 0; i < user.length; i++) {
                let UserId = user[i].id
                let data = await Game.findAll({where:{UserId}})
                let gamesPlayed = data.length
                let totalScore = 0
                data.forEach((el) =>{
                    totalScore += el.score
                })
                let finalResult = totalScore/gamesPlayed
                leaderboardsData.push({
                    name: user[i].name,
                    finalResult
                })
            }
            leaderboardsData.sort(function (a, b) {
                return b.finalResult - a.finalResult ;
              });
            res.status(200).json(leaderboardsData)
        }
        catch(err){
            console.log(err);
        }
    }
}

module.exports = Controller