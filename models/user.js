"use strict";
const bcrypt = require("bcrypt");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // User.hasMany(models.WatchWishlist, { foreignKey: "UserId" });
    }
  }
  User.init(
    {
      userName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: (instance, options) => {
          const salt = bcrypt.genSaltSync(8);
          instance.password = bcrypt.hashSync(instance.password, salt);
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
