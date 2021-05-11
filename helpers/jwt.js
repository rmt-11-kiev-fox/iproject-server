const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

function generateToken(payload){
    return jwt.sign(payload, SECRET)
}

function verify(token){
    return jwt.verify(token, SECRET)
}

module.exports = { generateToken, verify }