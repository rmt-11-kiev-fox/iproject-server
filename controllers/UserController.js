const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
    "693377768962-cfh5t58h8eicaabgd14sbgplpi7ttok9.apps.googleusercontent.com"
);

const { jwtSign } = require("../helpers/jwt");

class Controller {
    static async loginUser(req, res, next) {
        try {
            let { googleToken } = req.body;
            const ticket = await client.verifyIdToken({
                idToken: googleToken,
                audience:
                    "693377768962-cfh5t58h8eicaabgd14sbgplpi7ttok9.apps.googleusercontent.com",
            });
            const payload = ticket.getPayload();

            if (payload) {
                const findUser = await User.findOne({
                    where: { email: payload.email },
                });
                if (findUser) {
                    const token = jwtSign(findUser);
                    res.status(200).json({
                        email: findUser.email,
                        imageUrl: findUser.imageUrl,
                        access_token: token,
                    });
                } else {
                    const newUser = {
                        email: payload.email,
                        password: process.env.GOOGLE_PASSWORD,
                        imageUrl: payload.picture,
                    };
                    const createUser = await User.create(newUser);
                    const token = jwtSign(createUser);
                    res.status(200).json({
                        email: createUser.email,
                        imageUrl: createUser.imageUrl,
                        access_token: token,
                    });
                }
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports = Controller;
