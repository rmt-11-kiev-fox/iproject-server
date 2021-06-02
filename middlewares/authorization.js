const { Patient } = require('../models')

async function authorization (request, response, next) {
    try {
        let patient = await Patient.findByPk(request.params.id)
        if (patient) {
            if (patient.user_id === request.user.id) {
                next()
            } else {
                next({code: 401, message: 'You are not authorized!'})
            }
        } else {
            next({code: 404, message: 'Data not found!'})
        }
    } catch (error) {
        next({code: 500, message: 'Something wrong with authorization'})
    }
}

module.exports = authorization