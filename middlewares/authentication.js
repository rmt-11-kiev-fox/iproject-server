const { jwtDecode } = require("../helpers/jwt.js");
const { User } = require("../models/index.js");

async function authentication(req, res, next) {
    try {
        if (!req.headers.access_token)
            throw { status: 401, message: "Token is invalid. Please relogin." };
        else {
            const user = jwtDecode(req.headers.access_token);
            const foundUser = await User.findOne({
                where: { email: user.email },
            });

            if (foundUser) {
                req.currentUser = user;
                next();
            } else {
                throw {
                    status: 401,
                    message: "Token is invalid. Please relogin.",
                };
            }
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = authentication;
