'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FoodLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      FoodLog.belongsTo(models.UserData, {foreignKey: 'UserDataId'})
    }
  };
  FoodLog.init({
    UserDataId: DataTypes.INTEGER,
    foodName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `Food Name must not be empty`
        }
      }
    },
    category: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    calories: DataTypes.INTEGER,
    protein: DataTypes.INTEGER,
    carbohydrates: DataTypes.INTEGER,
    fat: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FoodLog',
  });
  return FoodLog;
};