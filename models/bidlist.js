'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BidList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BidList.belongsTo(models.User, {foreignKey: 'user_id'})
      BidList.belongsTo(models.Product, {foreignKey: 'product_id'})
    }
  };
  BidList.init({
    money_offer: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BidList',
  });
  return BidList;
};