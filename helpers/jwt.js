const jwt = require("jsonwebtoken");
const PRIVATE_KEY = process.env.PRIVATE_KEY;
console.log(PRIVATE_KEY, "privatekey<<<<");

function sign(payload) {
  return jwt.sign(payload, PRIVATE_KEY);
}

function verify(payload) {
  return jwt.verify(payload, PRIVATE_KEY);
}

module.exports = {
  sign,
  verify,
};
