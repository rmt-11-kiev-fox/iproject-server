const jwt = require("jsonwebtoken");

function jwtSign(user) {
    return jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY);
}

function jwtDecode(token) {
    return jwt.decode(token, process.env.SECRET_KEY);
}

module.exports = { jwtSign, jwtDecode };
