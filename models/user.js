'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt')
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
    username: {
      allowNull: false,
      validate: {
        notEmpty: { msg: `Username can't be empty!` }
      },
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      validate: {
        notEmpty: { msg: `Password can't be empty!` },
        len: { args: [6,8], msg: `Password length must be 6-8 characters!`}
      },
      type: DataTypes.STRING
    }
  }, {
    hooks: {
      beforeCreate(user) {
        user.password = hashPassword(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};