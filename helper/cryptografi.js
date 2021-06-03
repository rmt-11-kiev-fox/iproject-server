const { hashSync, compareSync } = require('bcryptjs')

const encryptPassword = (isPassword) => {
    return hashSync(isPassword, 8)
}

const decryptPassword = (inputPassword, enPassword) => {
    return compareSync(inputPassword, enPassword)
}

module.exports = { encryptPassword, decryptPassword }