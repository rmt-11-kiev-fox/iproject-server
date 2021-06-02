'use strict'
const bcrypt = require('bcryptjs')

function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

function verifyPassword(password, hash) {
    return bcrypt.compareSync(password, hash)
}

module.exports = { hashPassword, verifyPassword }
