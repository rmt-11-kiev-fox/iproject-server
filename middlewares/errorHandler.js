'use strict'

function errorHandler(err, req, res, next) {
    // console.log(err)
    let status
    let { name } = err
    const errors = []
    switch (name) {
        case 'SequelizeValidationError':
            // name = 'validationError'
            status = 400
            err.errors.forEach(elem => {
                errors.push({ message: elem.message })
            })
            break
        case 'invalidLogin':
            status = 400
            errors.push({ message: 'Invalid email or password!' })
            break
        case 'failedAuthentication':
            status = 401
            errors.push({ message: 'Authentication failed!' })
            break
        case 'JsonWebTokenError':
            status = 401
            errors.push({
                message: 'Authentication failed! (Invalid token)'
            })
            break
        case 'failedAuthorization':
            status = 401
            errors.push({ message: 'Authorization failed!' })
            break
        default:
            status = 500
            errors.push({ message: 'Internal server error!' })
    }
    res.status(status).json({ name, errors })
}

module.exports = errorHandler
