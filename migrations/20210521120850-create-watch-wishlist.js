"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("WatchWishlists", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      category: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.ENUM("Movies", "Tv"),
      },
      UserId: {
        type: Sequelize.INTEGER,
      },
      MovieId: {
        type: Sequelize.INTEGER,
      },
      posterPath: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      releaseDate: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("WatchWishlists");
  },
};
