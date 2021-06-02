const jwt = require('jsonwebtoken')

const SECRET_KEY = 'rahasia'

function generateToken (payload) {
  return jwt.sign(payload, SECRET_KEY)
}

function verifyToken (access_token) {
  return jwt.verify(access_token, SECRET_KEY)
}

module.exports = { generateToken, verifyToken }