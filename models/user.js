'use strict';
const {
  Model
} = require('sequelize');
const {hashPassword} = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.AnimeFav)
    }
  };
  User.init({
    name: {type:DataTypes.STRING,
    validate:{
      notEmpty:{
        msg:"Name is Required"
      }
    }},
    email: {type:DataTypes.STRING,
    validate:{
      notEmpty:{
        msg:"E-mail cannot be Empty"
      },
    isEmail:{
      args:true,
      msg:"Email format isnt Valid"
    }
    },unique:true},
    password: {type:DataTypes.STRING,
    allowNull:false,
    validate:{
      notEmpty:{
        msg:"Password is Required"
      },len:{
        args: 5,
        msg:"Password has to be made of 5 character or more"
      }
    }}
  }, {
    sequelize,
    modelName: 'User',
  });
  User.addHook('beforeCreate',(instance,option)=>{
    instance.password = hashPassword(instance.password)
  })
  return User;
};