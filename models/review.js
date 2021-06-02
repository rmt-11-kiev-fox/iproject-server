"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Review.belongsTo(models.User, { foreignKey: "UserId" });
      // Review.belongsTo(models.Movie, { foreignKey: "MovieId" });
    }
  }
  Review.init(
    {
      UserId: DataTypes.INTEGER,
      MovieId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      review: DataTypes.TEXT,
      rating: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
