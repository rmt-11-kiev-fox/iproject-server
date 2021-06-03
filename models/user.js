'use strict';
const {
  Model
} = require('sequelize');
const { encryptPassword } = require('../helper/cryptografi')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'Please input your email'
        },
        isEmail: {
          msg: 'Please input email type'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please input your password"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((instence, options) => {

    const EnPass = encryptPassword(instence.password)
    instence.password = EnPass

  })

  return User;
};