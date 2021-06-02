const axios = require('axios')
class StandingController {
    static getStandings (req, res, next) {
        const leagueKey = req.body.leagueKey
        axios({
            url: `https://apiv3.apifootball.com/?action=get_standings&league_id=${leagueKey}&APIkey=${process.env.API_KEY}`,
            method: 'get'
        })
            .then(({ data }) => {
                res.status(200).json(data)
            })
            .catch((err) => {
                next(err)
            })
    }
}

module.exports = StandingController