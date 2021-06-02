const jwt = require ('jsonwebtoken')

function createToken (payload) {
    return jwt.sign(payload, process.env.PRIVATE_KEY)
}

function verifyToken (token) {
    return jwt.verify(token, process.env.PRIVATE_KEY)
}

module.exports = {createToken, verifyToken}