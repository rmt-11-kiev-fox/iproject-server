const jwt = require('jsonwebtoken')
const { User } = require('../models')

const authLogin = async (req, res, next) => {
    try {
        if (!req.headers.token) {
            throw { status: 400, message: 'Please login first' }
        } else {
            const access = jwt.verify(req.headers.token, process.env.PRIVATE_KEY)
            const isFoundUser = await User.findOne({ where: { id: access.id } })
            if (isFoundUser) {
                next()
            } else {
                throw { status: 401, message: 'Please register for login' }
            }
        }
    } catch (error) {
        const status = error.status || 500
        const message = error.message || 'internal server error'
        res.status(status).json(message)
    }
}

module.exports = { authLogin }