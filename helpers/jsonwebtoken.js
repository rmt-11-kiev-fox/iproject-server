const jwt = require ('jsonwebtoken')

function signJwt(payload){
    return jwt.sign(payload, process.env.SHHH)
}

function verifyJwt(token){
    return jwt.verify(token, process.env.SHHH)
}

module.exports = {signJwt,verifyJwt}