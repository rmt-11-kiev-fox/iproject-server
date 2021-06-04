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
      User.hasMany(models.Donation, { foreignKey: 'UserId' })
         }
  };
  User.init({
    firstName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "First Name is required"
        },
      }
    },
    lastName: {
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
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Phone Number is required"
        },
      }
    },
    address: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Address is required"
        },
      }
    },
  }, {
    hooks: {
      beforeCreate(instance) {
        instance.password = hashPassword(instance.password)
      }
    },
    sequelize: sequelize,
    modelName: 'User',
  });
  return User;
};