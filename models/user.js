"use strict";
const { hashPassword } = require("../helpers/bcrypt");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, { foreignKey: "UserId" });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
          notEmpty: {
            msg: "please enter your valid email",
          },
        },
      },

      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "password is required !",
          },
          len: {
            args: [6, 12],
            msg: "password character length between 6 to 12 characters",
          },
        },
      },
    },
    {
      sequelize,
      hooks: {
        beforeCreate: (user) => {
          user.password = hashPassword(user.password);
        },
      },
      modelName: "User",
    }
  );
  return User;
};
