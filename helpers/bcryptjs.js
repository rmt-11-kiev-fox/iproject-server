const bcryptjs = require('bcryptjs')
const salt = bcryptjs.genSaltSync(8)

function hashPassword(password){
    return bcryptjs.hashSync(password, salt)
}

function checkPassword(inputtedPassword, dbPassword){
    return bcryptjs.compareSync(inputtedPassword, dbPassword)
}

module.exports = { hashPassword, checkPassword }