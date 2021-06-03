'use strict'
const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.JWT_SECRET_KEY

function signToken(userData) {
    return jwt.sign(userData, SECRET_KEY, { expiresIn: '30d' })
}

function verifyToken(token) {
    return jwt.verify(token, SECRET_KEY)
}

module.exports = { signToken, verifyToken }
