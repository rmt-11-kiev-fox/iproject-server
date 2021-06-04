'use strict';
const { hashSync } = require('../helpers/bcrypt')
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
    userName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `User Name must not be empty`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `Email must not be empty`
        },
        isEmail: {
          msg: `Email must an email format`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `Password must not be empty`
        }
      }
    },
    gender: DataTypes.STRING,
    birthDate: {
      type: DataTypes.DATEONLY,
      validate: {
        notEmpty: {
          msg: `Birth Date must not be empty`
        }
      }
    },
    weight: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: `Weight must not be empty`
        },
        min: {
          args: [20],
          msg: `weight must not be less than 20 kg`
        }
      }
    },
    height: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: `Height must not be empty`
        },
        min: {
          args: [60],
          msg: `Height must not be less than 60 cm`
        },
        max: {
          args: [300],
          msg: `Height must not be 300 cm or up`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.afterValidate(async (user) => {
    const hashedPassword = await hashSync(user.password, 8)

    user.password = hashedPassword
  })
  return User;
};