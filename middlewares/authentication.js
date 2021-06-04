const { verify } = require('../helpers/jwt')
const { User } = require('../models')

async function authentication (request, response, next) {
    try {
        if (!request.headers.access_token) {
            response.status(401).json({message: 'Please login first!'})
        } else {
            let decoded = verify(request.headers.access_token)
            let user = await User.findByPk(decoded.id)
            if (user) {
                request.user = {
                    id: decoded.id,
                    email: decoded.email
                }
                next()
            } else {
                response.status(401).json({message: 'Access forbidden!'})
            }
        }
    } catch (error) {
        response.status(500).json({message:'Something wrong with authentication'})
    }
}

module.exports = authentication