const { verifying } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(req, res, next) {
    try {
        let accessToken = verifying(req.headers.access_token);
        // console.log(accessToken);
        if (!accessToken) {
            res.status(403).json({
                message: "You must Login First!!!",
            });
        } else {
            let cekDataBase = await User.findOne({
                where: {
                    id: accessToken.id,
                },
            });
            if (!cekDataBase) {
                res.status(403).json({
                    message: "You must Login First!!!",
                });
            }
            // console.log(cekDataBase);
            // console.log(accessToken);
            if (cekDataBase.id === accessToken.id) {
                req.authentication = accessToken;
                next();
            } else {
                res.status(403).json({
                    message: "You must Login First!!!",
                });
            }
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = authentication;
