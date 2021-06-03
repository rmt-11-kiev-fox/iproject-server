const {encode} = require("../helpers/bcrypt")

'use strict';
const {
  Model
} = require('sequelize');
const { options } = require("../routes");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Game, {foreignKey:'UserId'})
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      unique:true,
      validate:{
        notEmpty:true
      }
    },
    email: {
      type: DataTypes.STRING,
      unique:true,
      validate:{
        notEmpty:true
      },
    },
    password: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:true
      }
    },
    role: DataTypes.STRING,
    verified: DataTypes.BOOLEAN,
    achievement: DataTypes.STRING
  }, {
    sequelize,
    hooks:{
      beforeCreate:(instance,options) =>{
        instance.password = encode(instance.password),
        instance.verified = false
      }
    },
    modelName: 'User',
  });
  return User;
};