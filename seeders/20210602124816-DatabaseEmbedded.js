"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        let output = [];
        const input = require("../embeddedData.json");
        input.forEach((element) => {
            output.push({
                apiId: element.apiId,
                query: element.query,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        });
        await queryInterface.bulkInsert("EmbeddedData", output, {});
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete("EmbeddedData", null, {});
    },
};
