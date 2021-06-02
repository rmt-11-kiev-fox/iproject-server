const jwt = require('jsonwebtoken')
const JWTPASS = process.env.JWTPASS

function generateToken(payload) {
    return jwt.sign(payload, JWTPASS)
}

function verifyToken(access_token) {
    return jwt.verify(access_token, JWTPASS)
}

module.exports = {generateToken, verifyToken}