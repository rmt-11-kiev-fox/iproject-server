const axios = require('axios')

class APIController {
    static catpi (req, res, next) {
        console.log(req.body.message);
        const msg = req.body.message || ''
        axios({
            method: 'GET',
            url: `https://cataas.com/cat/gif/says/${msg}?json=true`
        })
          .then(({ data }) => {
            res.status(200).json({
              message: `https://cataas.com${data.url}`
            })
          })
          .catch((err) => {
            next(err)
          })
    }
}

module.exports = APIController