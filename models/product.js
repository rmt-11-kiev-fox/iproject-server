'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Category, {foreignKey: 'category_id'})
      Product.hasMany(models.Like, {foreignKey: 'product_id'})
      Product.hasMany(models.BidList, {foreignKey: 'product_id'})
    }
  };
  Product.init({
    title: DataTypes.STRING,
    artist: DataTypes.STRING,
    image_url: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    startBid: DataTypes.DATE,
    endBid: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};