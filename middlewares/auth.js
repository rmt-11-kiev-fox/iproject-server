'use strict'
const { User } = require('../models')
const { verifyToken } = require('../helpers/jwt')

async function authenticate(req, res, next) {
    try {
        // console.log('MASUK SINI')
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

async function authorize(req, res, next) {}

module.exports = { authenticate, authorize }
