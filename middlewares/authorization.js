const {Task} = require('../models')

function authorize(req, res, next) {
    Task.findOne({
        where: {id: +req.params.id}
    })
    .then(data => {
        if(data) {
            if(data.UserId !== req.loggedUser.id) {
                next({ name: 'InvalidToken' })
            } else {
                next()
            }
        } else {
            next({ name: 'NotFound'})
        }
    })
    .catch(err => {
        next(err)
    })
}

module.exports = authorize