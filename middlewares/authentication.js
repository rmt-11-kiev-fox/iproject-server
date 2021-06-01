const { verify } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(req, res, next) {
  console.log(req.headers, "<<headers");
  const token = req.headers.access_token;
  try {
    const decoded = verify(token);
    if (!token) {
      throw { name: "myError", status: 403, message: "please sign in first!" };
    }
    const foundUser = await User.findByPk(decoded.id);
    if (foundUser) {
      req.user = decoded;
      next();
    } else {
      throw { name: "myError", status: 403, message: "invalid access token!" };
    }
  } catch (err) {
    next(err);
  }
}

module.exports = authentication;
