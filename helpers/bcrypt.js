const bcrypt = require("bcryptjs");

function hashPassword(plainPass) {
  const salt = bcrypt.genSaltSync(8);
  return bcrypt.hashSync(plainPass, salt);
}

function comparePass(plainPass, encryptPass) {
  return bcrypt.compareSync(plainPass, encryptPass);
}

module.exports = {
  hashPassword,
  comparePass,
};
