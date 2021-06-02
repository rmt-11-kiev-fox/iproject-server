'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FavouriteOrganization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      FavouriteOrganization.belongsTo(models.User, { foreignKey: 'UserId' })
    }
  };
  FavouriteOrganization.init({
    UserId: DataTypes.INTEGER,
    organizationName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FavouriteOrganization',
  });
  return FavouriteOrganization;
};