'use strict'
const { User } = require('../models')
const { verifyToken } = require('../helpers/jwt')

async function authenticate(req, res, next) {
    try {
        const { access_token } = req.headers
        if (!access_token) throw { name: 'failedAuthentication' }
        const decoded = verifyToken(access_token)
        // console.log(decoded)
        const foundUser = await User.findOne({ where: { id: decoded.id } })
        if (!foundUser) throw { name: 'failedAuthentication' }
        req.user = foundUser
        next()
    } catch (err) {
        next(err)
    }
}

async function authorizeSocket(req, res, next) {
    try {
        const { socket_key } = req.headers
        const verifiedKey = process.env.SOCKET_AUTH_KEY
        // console.log(socket_key, verifiedKey, '<<<<<')
        if (!socket_key || socket_key !== verifiedKey)
            throw { name: 'failedAuthorization' }
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = { authenticate, authorizeSocket }
