const jwt = require("jsonwebtoken")

function sign(payload){
    return jwt.sign(payload, process.env.SECRET_KEY)
}

function verify(token){
    return jwt.verify(token, process.env.SECRET_KEY)
}

module.exports = {sign, verify}