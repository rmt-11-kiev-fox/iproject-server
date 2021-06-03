'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Game.belongsTo(models.User, {foreignKey:"UserId"})
      Game.hasMany(models.Question, {foreignKey:"GameId"})
    }
  };
  Game.init({
    type: DataTypes.STRING,
    topic: DataTypes.STRING,
    score: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};