const jwt = require("jsonwebtoken");

const login = (payload) => {
    return jwt.sign(payload, "secretKey2019ojkn8h98ipklni8ycso[399njkfejpq39ojm kjec");
};

const verifying = (access_token = null) => {
    if (access_token) {
        return jwt.verify(access_token, "secretKey2019ojkn8h98ipklni8ycso[399njkfejpq39ojm kjec");
    } else {
        return false;
    }
};

module.exports = {
    login,
    verifying,
};
