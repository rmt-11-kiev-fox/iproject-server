'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExerciseLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ExerciseLog.belongsTo(models.UserData, {foreignKey: 'UserDataId'})
    }
  };
  ExerciseLog.init({
    UserDataId: DataTypes.INTEGER,
    exerciseName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `Exercise Name must not be empty`
        }
      }
    },
    notes: DataTypes.STRING,
    repetitions: DataTypes.INTEGER,
    sets: DataTypes.INTEGER,
    time: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ExerciseLog',
  });
  return ExerciseLog;
};