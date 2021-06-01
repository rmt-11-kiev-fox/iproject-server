"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Playlist extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Playlist.belongsTo(models.User, { foreignKey: "UserId" });
        }
    }
    Playlist.init(
        {
            title: DataTypes.STRING,
            url: DataTypes.STRING,
            UserId: DataTypes.INTEGER,
            apiId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Playlist",
        }
    );
    return Playlist;
};
