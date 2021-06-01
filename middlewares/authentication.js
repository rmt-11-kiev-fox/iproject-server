const {verify} = require('../helpers/jwt')

function authentication (req, res, next){
    if(!req.headers.access_token){
        console.log("login first");
    }
    else{
        let decoded = verify(req.headers.access_token)
        req.user = {
            id: decoded.id,
            username: decoded.username
        }
        next()
    }
}

module.exports = authentication