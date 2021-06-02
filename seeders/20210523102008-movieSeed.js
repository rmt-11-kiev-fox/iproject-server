"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let data = require("../movie.json");
    data.forEach((el) => {
      (el.createdAt = new Date()), (el.updatedAt = new Date());
    });
    await queryInterface.bulkInsert("Movies", data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Movies", null, {});
  },
};
