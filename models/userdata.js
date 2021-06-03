'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserData.hasMany(models.ExerciseLog, {foreignKey: 'UserDataId'})
      UserData.hasMany(models.FoodLog, {foreignKey: 'UserDataId'})
    }
  };
  UserData.init({
    UserId: DataTypes.INTEGER,
    date: {
      type: DataTypes.DATEONLY,
      validate: {
        notEmpty: {
          msg: `Date must not be empty`
        }
      }
    },
    currentWeight: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: [20],
          msg: `Weight must not be less than 20 kg`
        }
      }
    },
    calories: DataTypes.INTEGER,
    protein: DataTypes.INTEGER,
    carbohydrates: DataTypes.INTEGER,
    fat: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserData',
  });
  return UserData;
};