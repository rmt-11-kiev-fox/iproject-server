const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY

const tokenGenerator = (user) => {
    return jwt.sign({
        id: user.id,
        username: user.username
    }, secretKey)
}

const tokenVerifier = (token) => {
    return jwt.verify(token, secretKey)
}

module.exports = {
    tokenGenerator, tokenVerifier
}
