const { User } = require("../models");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

class Controller {
  static registerUser(req, res, next) {
    console.log("IN");
    let newUser = {
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    };
    User.create(newUser)
      .then((data) => {
        if (!data) {
          next({ status: 400, message: "Bad Request failed to create" });
        } else {
          let filtered = {
            userName: data.userName,
            email: data.email,
          };
          res.status(201).json(filtered);
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
  static loginUser(req, res, next) {
    let userData = {
      email: req.body.email,
      password: req.body.password,
    };

    User.findOne({ where: { email: userData.email } })
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: "User Not Found" });
        } else if (bcrypt.compareSync(userData.password, data.password)) {
          let access_token = jwt.sign(
            { id: data.id, email: data.email },
            process.env.SECRET_KEY
          );
          res.status(200).json({ access_token });
        } else {
          console.log(data.email, "login data");
          console.log("invalid login");
          res.status(401).json({ message: "invalid login" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "error login" });
      });
  }
}

module.exports = Controller;
