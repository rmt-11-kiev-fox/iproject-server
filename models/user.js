'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/compare-pwd');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Like, {foreignKey: 'user_id'})
      User.hasMany(models.BidList, {foreignKey: 'user_id'})
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          msg: 'wrong format email!'
        },
        notEmpty: {
          msg: 'email is requeired!'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6, 25],
          msg: 'password min 6 and max 25 character!'
        },
        notEmpty: {
          msg: 'password is requeired!'
        }
      }
    },
    fullname: DataTypes.STRING,
    address: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user) => {
        if (!user.isAdmin){
          user.isAdmin = false
        }
        if(user.password){
          user.password = hashPassword(user.password, 8)
        }
      }
    }
  });
  return User;
};