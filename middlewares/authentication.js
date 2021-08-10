const jwt = require("jsonwebtoken");
const { User } = require("../models");

// console.log("INside authentication");
const authentication = (req, res, next) => {
  try {
    let decoded = jwt.verify(req.headers.access_token, process.env.SECRET_KEY);
    User.findByPk(decoded.id)
      .then((data) => {
        if (data) {
          req.user = {
            id: data.id,
            email: data.email,
          };
          console.log(req.user.id, "AUthentication req user id");
          next();
        } else {
          console.log("authentication err");
          res.status(404).json({ message: "authentication not found" });
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = authentication;
