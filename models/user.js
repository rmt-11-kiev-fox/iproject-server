'use strict';
const { hash } = require('../helpers/bcrypt');
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
      User.hasMany(models.Patient, { foreignKey: 'user_id' })
    }
  };
  User.init({
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your name'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Please enter a valid email address'
        }
      }
    },
    password: DataTypes.STRING
  }, {
    hooks: {
        beforeCreate(instance, options) {
          instance.password = hash(instance.password)
        }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};