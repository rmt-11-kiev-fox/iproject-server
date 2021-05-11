'use strict';

const { hashPassword } = require('../helpers/bcryptjs.js')
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
      User.belongsToMany(models.Animal, { through: models.FavoriteAnimal, foreignKey: 'UserId' })
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Username is Already in Used',
        fields: ['username']
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please Input Username'
        },
        notNull: {
          args: true,
          msg: 'Username is Required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Email is Already in Used',
        fields: ['email']
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please Input Email'
        },
        notNull: {
          args: true,
          msg: 'Email is Required'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please Input Password'
        },
        notNull: {
          args: true,
          msg: 'Password is Required'
        },
        len: { 
          args: [6, 20],
          msg: "Password Length Should be Between 6 and 20 Characters."
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(user, options){
        user.password = hashPassword(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};