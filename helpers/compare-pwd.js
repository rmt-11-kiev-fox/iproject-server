const bcrypt = require('bcryptjs')

let comparePassword = function(inputPwd, dbPwd){
  return bcrypt.compareSync(inputPwd, dbPwd)
}

let hashPassword = function(pwd, round){
  return bcrypt.hashSync(pwd, round)
}

module.exports = {comparePassword, hashPassword}