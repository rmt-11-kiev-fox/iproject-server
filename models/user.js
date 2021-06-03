"use strict";
const { Model } = require("sequelize");
const { randomizePassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.hasMany(models.Playlist, { foreignKey: "UserId" });
        }
    }
    User.init(
        {
            username: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: {
                        msg: "username required",
                    },
                },
            },
            password: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: {
                        msg: "password required",
                    },
                },
            },
        },
        {
            sequelize,
            modelName: "User",
            hooks: {
                beforeCreate: (user) => {
                    user.password = randomizePassword(user.password);
                },
            },
        }
    );
    return User;
};
