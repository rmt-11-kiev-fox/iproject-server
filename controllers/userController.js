const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class UserController {
  static async registerHandler(req, res, next) {
    const { email, username, password, image, role, location } = req.body;

    let obj = {
      email,
      password,
      username,
      image,
      role,
      location: location || null,
    };
    console.log(location);
    try {
      const createdUser = await User.create(obj);
      res.status(201).json({
        msg: "register success",
        status: 201,
        data: {
          id: createdUser.id,
          email: createdUser.email,
        },
      });
    } catch (err) {
      if (err.name === "SequelizeUniqueConstraintError") {
        next({
          name: "Register Error",
          status: 400,
          message: "Username not avalaible",
        });
      } else if (err.name === "SequelizeValidationError") {
        const errors = err.errors.map((item) => {
          return item.message;
        });
        next({
          name: "Create User Failed",
          status: 400,
          message: errors,
        });
      } else {
        console.log(err);
        next({
          name: "Create User Failed",
          status: 500,
          message: "Internal Server Error",
        });
      }
    }
  }

  static async loginHandler(req, res, next) {
    let obj = {
      username: req.body.username,
      password: req.body.password,
    };

    try {
      const foundData = await User.findOne({
        where: {
          username: obj.username,
        },
      });

      if (!foundData) {
        next({
          name: "Login Failed",
          status: 400,
          message: "invalid password or email",
        });
      } else {
        if (bcrypt.compareSync(obj.password, foundData.password)) {
          const accessToken = jwt.sign(
            { id: foundData.id, username: foundData.username },
            process.env.SECRET_KEY
          );
          res.status(200).json({
            accessToken,
            username: foundData.username,
            image: foundData.image,
            role: foundData.role,
          });
        } else {
          next({
            name: "Login Failed",
            status: 400,
            message: "invalid password or email",
          });
        }
      }
    } catch (err) {
      console.log(err);
      next({
        name: "Login Failed",
        status: 500,
        message: "Internal Server Error",
      });
    }
  }
}

module.exports = UserController;
