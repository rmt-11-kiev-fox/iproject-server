const bcrypt = require('bcryptjs')

function hash(password) {
    return bcrypt.hashSync(password, 8)
}

function compare(password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword)
}

module.exports = {
    hash,
    compare
}