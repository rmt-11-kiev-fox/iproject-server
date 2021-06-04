const { User } = require("../models");
const { sign } = require("../helpers/jwt");
const { comparePass } = require("../helpers/bcrypt");

class userController {
  static async signup(req, res, next) {
    // console.log(req.body, "<<body regist");
    let { email, password } = req.body;
    try {
      let data = { email, password };
      let newUser = await User.create(data);
      res.status(201).json({
        id: newUser.id,
        email: newUser.email,
      });
    } catch (err) {
      next(err);
    }
  }

  static async signin(req, res, next) {
    // console.log(req.body, "<<<body signin");
    let { email, password } = req.body;
    try {
      let data = await User.findOne({ where: { email } });
      if (data) {
        let isPass = comparePass(password, data.password);

        if (!isPass) {
          throw {
            name: "myError",
            status: 400,
            message: "something wrong when sign in",
          };
        } else {
          let payload = sign({
            id: data.id,
            email: data.email,
          });
          res.status(200).json({
            id: data.id,
            email: data.email,
            access_token: payload,
          });
        }
      } else {
        throw {
          name: "myError",
          status: 400,
          message: "something wrong when sign in",
        };
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = userController;
