const axios = require('axios')

class APIController {
    static quotes(req, res, next) {
        axios.get('https://api.fisenko.net/quotes/87JbG3YL6Z')
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = APIController