const axios = require ('axios')
class TeamController {
    static getAllTeamsByLeague (req, res, next) {
        const league_id = +req.query.leagueKey
        axios({
            url: `https://apiv3.apifootball.com/?action=get_teams&league_id=${league_id}&APIkey=${process.env.API_KEY}`,
            method: 'get'
        })
            .then(({data})=> {
                res.status(200).json(data)
            })
            .catch((err) => {
                next(err)
            })
    }

    static getTeamByTeamKey (req, res, next) {
        const team_id = +req.params.teamKey
        axios({
            url: `https://apiv3.apifootball.com/?action=get_teams&team_id=${team_id}&APIkey=${process.env.API_KEY}`,
            method: 'get'
        })
            .then(({data})=> {
                res.status(200).json(data[0])
            })
            .catch((err) => {
                next(err)
            })

    }
}

module.exports = TeamController
