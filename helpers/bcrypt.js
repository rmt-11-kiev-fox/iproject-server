const bcrypt = require('bcryptjs')

function hashPassword (password) {
    const hashed = bcrypt.hashSync(password, 10)
    return hashed
}

function validatePassword (password, hashed) {
    return bcrypt.compareSync(password, hashed)
}

module.exports = {hashPassword, validatePassword}