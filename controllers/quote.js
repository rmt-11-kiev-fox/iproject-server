const axios = require('axios')

class Controller {
    static getQuote (req, res, next) {
        let urlApi = "https://api.quotable.io/random"
        let quote
        axios.get(urlApi)
        .then((data)=>{ 
            quote = `"${data.data.content}" by ${data.data.author}`
            res.status(200).json(quote)
            
        })
        .catch((err) => {
            console.log(err);
        })
    }
}

module.exports = Controller