'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuestionList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  QuestionList.init({
    name: DataTypes.STRING,
    title: {
      type: DataTypes.STRING,
      unique: true
    },
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'QuestionList',
  });
  return QuestionList;
};