'use strict';
const {
  Model
} = require('sequelize');
const { hash } = require('../helpers/bcrypt.js')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Favourite)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Email is required'
        },
        isEmail: {
          msg: 'Email format is required'
        }
      }
    },
    username: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Password is required'
        },
        len: {
          args: [ 6, 13 ],
          msg: 'Password length must be 6 until 13 character'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, option) => {
        user.password = hash(user.password)
        if (user.username === undefined) {
          console.log(user.email,'<<<<<ini di hooks user email');
          user.username = user.email.split('@')[0]
          console.log(user.username, 'ini usernam di hooks');
        }
      }
    }
  });
  return User;
};