'use strict';
const { hashPassword } = require('../helpers/bcrypt')
const {
  Model
} = require('sequelize');
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
    fName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "First Name is required"
        },
      }
    },
    lName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Last Name is required"
        },
      }
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Username is required"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Email is required"
        },
        isEmail: {
          msg: "Please enter a valid email address"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Password is required"
        },
        isAlphanumeric: {
          msg: "Password must be a minimum of .... ."
        }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      // validate: {
      //   notEmpty: {
      //     msg: "Phone Number is required"
      //   },
      // }
    },
    address: {
      type: DataTypes.STRING,
      // validate: {
      //   notEmpty: {
      //     msg: "Address is required"
      //   },
      // }
    },
  },{
  hooks: {
      beforeCreate(instance){
        instance.password = hashPassword(instance.password)
      }
    },
    sequelize: sequelize,
    modelName: 'User',
  });
  return User;
};