const bcrypt = require('bcryptjs')
const saltRound = +process.env.SALT_ROUND
const salt =  bcrypt.genSaltSync(saltRound)

const hashPassword = (password) => bcrypt.hashSync(password, salt)
const compareHash = (password, dbPassword) => bcrypt.compareSync(password, dbPassword)

module.exports = { hashPassword, compareHash }