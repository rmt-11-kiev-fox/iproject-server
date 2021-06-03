'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NewSpecies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  NewSpecies.init({
    name: DataTypes.STRING,
    img_url: DataTypes.STRING,
    kingdom: DataTypes.STRING,
    habitat: DataTypes.STRING,
    region: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'NewSpecies',
  });
  return NewSpecies;
};