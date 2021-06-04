const axios = require('axios')

class APIController {
    static image(req, res, next) {
        axios.get('https://coffee.alexflipnote.dev/random.json')
        .then(data => {
            // console.log(data.data)
            res.status(200).json(data.data)
        })
        .catch(err => {
            next(err)
        })
    }
    static location(req, res, next) {
        axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.API_KEY}`)
        .then(data => {
            res.status(200).json({long: +data.data.longitude, lat: +data.data.latitude})
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = APIController