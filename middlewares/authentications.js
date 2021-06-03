const jwt = require("jsonwebtoken");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    if (!req.headers.access_token) {
      throw { status: 403, message: "Please Login First" };
    }

    const decode = jwt.verify(req.headers.access_token, process.env.SECRET_KEY);

    const foundUser = await User.findByPk(decode.id);

    if (foundUser) {
      req.currentUser = {
        id: foundUser.id,
        username: foundUser.username,
        role: foundUser.role,
      };
      next();
    } else {
      throw { status: 403, message: "Invalid Access Token" };
    }
  } catch (err) {
    const status = err.status || 500;
    const message = err.message || "internal server error";
    res.status(status).json({ message });
  }
};

module.exports = { authentication };
