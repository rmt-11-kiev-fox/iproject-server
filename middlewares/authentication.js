const { verifyToken } = require('../helpers/jwt')
const {User} = require('../models')

function authenticate(req, res, next) {
    const {access_token} = req.headers
    try {
        if(access_token) {
            const decoded = verifyToken(access_token)
            User.findOne({
                where: {email: decoded.email}
            })
            .then(user => {
                if(user) {
                    req.loggedUser = {
                        id: decoded.id,
                        username: decoded.username,
                        email: decoded.email
                    }
                    next()
                } else {
                    next({ name: 'InvalidToken'})
                }
            })
            .catch(err => {
                next(err)
            })
        } else {
            next({ name: 'PleaseLogin' })
        }
    } catch(err) {
        next(err)
    }
}

module.exports = authenticate