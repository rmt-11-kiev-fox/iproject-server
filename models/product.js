"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  Product.init(
    {
      product_id: DataTypes.INTEGER,
      brand: DataTypes.STRING,
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      image_url: DataTypes.STRING,
      description: DataTypes.TEXT,
      category: DataTypes.STRING,
      product_type: DataTypes.STRING,
      color: DataTypes.STRING,
      product_tag: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
