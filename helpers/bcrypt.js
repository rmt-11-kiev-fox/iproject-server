const bcrypt = require('bcrypt')
const saltRound = +process.env.SALT_ROUND

const hashPassword = (password) => bcrypt.hashSync(password, saltRound)
const compareHash = (password, dbPassword) => bcrypt.compareSync(password, dbPassword)

module.exports = { hashPassword, compareHash }