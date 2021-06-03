'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EmbeddedData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  EmbeddedData.init({
    apiId: DataTypes.INTEGER,
    query: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'EmbeddedData',
  });
  return EmbeddedData;
};