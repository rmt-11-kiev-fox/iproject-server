const bcrypt = require('bcryptjs')

function hashSync (password, num) {
   return bcrypt.hashSync(password, num)
}

function compareSync (newPassword, hashedPassword) {
   return bcrypt.compareSync(newPassword, hashedPassword)
}

module.exports = { hashSync, compareSync }