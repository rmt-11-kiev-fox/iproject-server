"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class WatchWishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // WatchWishlist.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  WatchWishlist.init(
    {
      category: DataTypes.STRING,
      type: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
      MovieId: DataTypes.INTEGER,
      posterPath: DataTypes.STRING,
      title: DataTypes.STRING,
      releaseDate: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "WatchWishlist",
    }
  );
  return WatchWishlist;
};
