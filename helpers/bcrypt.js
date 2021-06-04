const bcrypt = require('bcryptjs')

function hashPass(plainPass) {
    return bcrypt.hashSync(plainPass, 10)
}

function comparePass(plainPass, encryptedPass) {
    return bcrypt.compareSync(plainPass, encryptedPass)
}

module.exports = {hashPass, comparePass}