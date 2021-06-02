const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

async function authentication (req, res, next) {
    try {
        const token = req.headers.access_token
        const userDecoded = verifyToken(token)
        const foundUser = await User.findOne({ where: { id: userDecoded.id, email: userDecoded.email }})
        if (foundUser) {
            req.activeUser = { id: foundUser.id, email: foundUser.email, username: foundUser.username }
            console.log(req.activeUser);
            next()
        } else {
            next({name: 'Invalid access token'})
        }
    } catch (error) {
        next(error)
    }
}

module.exports = authentication